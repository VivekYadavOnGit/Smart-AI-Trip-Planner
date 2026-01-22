import React, { useState, useEffect } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { Infinity, Save, X } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { enrichTravelData } from "@/lib/enrichDataWithPlaces";
import { FcGoogle } from "react-icons/fc";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

export const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: "",
    budget: "",
    traveller: "",
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: tripData,
      userEmail: user?.email,
      id: docId,
    });
    console.log(docId);
    setLoading(false);
    navigate(`/view-trip/` + docId);
  };

  const OnGenerateTrip = async () => {
    try {
      setLoading(true);

      // Format the prompt with actual values
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location.label)
        .replace('{totalDays}', formData.noOfDays)
        .replace('{traveller}', formData.traveller)
        .replace('{budget}', formData.budget);

      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);

        // Extract JSON block
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No valid JSON block found in AI response");

        let jsonString = jsonMatch[0];

        // ❌ Cleanup common JSON issues
        jsonString = jsonString
          .replace(/\n/g, ' ')                       // remove newlines
          .replace(/,\s*}/g, '}')                   // remove trailing commas in objects
          .replace(/,\s*]/g, ']')                   // remove trailing commas in arrays
          .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // quote unquoted keys

        let parsed;
        try {
          parsed = JSON.parse(jsonString);
        } catch (parseError) {
          console.error("❌ JSON Parse Error (first pass):", parseError);
          console.error("❌ Attempted JSON:", jsonString);

          // Try a best-effort fix for truncated JSON (e.g. missing closing ] or })
          const openCurly = (jsonString.match(/{/g) || []).length;
          const closeCurly = (jsonString.match(/}/g) || []).length;
          const openSquare = (jsonString.match(/\[/g) || []).length;
          const closeSquare = (jsonString.match(/]/g) || []).length;

          let fixedJson = jsonString;

          // Close arrays first, then objects – this matches our schema shape
          if (openSquare > closeSquare) {
            fixedJson += ']'.repeat(openSquare - closeSquare);
          }
          if (openCurly > closeCurly) {
            fixedJson += '}'.repeat(openCurly - closeCurly);
          }

          try {
            parsed = JSON.parse(fixedJson);
            console.warn("✅ JSON parsed successfully after auto-fix.");
          } catch (secondError) {
            console.error("❌ JSON Parse Error (after auto-fix):", secondError);
            throw new Error("Failed to parse AI response as JSON");
          }
        }

        // Validate required fields (support older schema too)
        if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
          if (parsed.days && Array.isArray(parsed.days)) {
            parsed.itinerary = parsed.days;
            delete parsed.days;
          } else {
            throw new Error("Invalid trip data format: 'itinerary' array missing");
          }
        }

        // Enrich with additional data
        const enriched = await enrichTravelData(parsed);
        await SaveAiTrip(enriched);
        
        toast.success("🎉 Trip plan generated successfully!");
        setLoading(false);
      } catch (error) {
        console.error("❌ Error details:", error);
        setLoading(false);
        toast.error(error.message || "Failed to generate trip plan");
      }
    } catch (error) {
      console.error("❌ Error details:", error);
      setLoading(false);
      toast.error(error.message || "Failed to generate trip plan");
    }
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("✅ User Profile:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (err) {
      console.error("❌ Failed to get user profile:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20">
        <h1 className="text-3xl font-bold">
          Tell us your travel preferences 🗺️✈️
        </h1>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-20 flex flex-col gap-10">
          {/* Destination */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination of choice? 📍
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Search for a destination...",
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>

          {/* Days */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip? 📅
            </h2>
            <input
              type="number"
              placeholder="Example: 5"
              className="w-full border border-gray-300 rounded-md p-2"
              min={1}
              max={10}
              value={formData.noOfDays}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              onWheel={(e) => e.target.blur()} // Prevent scroll changing value
              onKeyDown={(e) => e.key === "e" && e.preventDefault()} // Prevent typing 'e'
            />
          </div>

          {/* Budget */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your budget for the trip?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border border-gray-300 cursor-pointer rounded-lg hover:shadow-lg ${
                    formData.budget === item.title && "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.description}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Travellers */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              Who are you travelling with?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border border-gray-300 cursor-pointer rounded-lg hover:shadow-lg ${
                    formData.traveller === item.people &&
                    "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("traveller", item.people)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.description}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button onClick={OnGenerateTrip} disabled={loading}>
            <Infinity className={loading ? "animate-spin" : ""} size={25} />
            {loading ? "Generating..." : "Generate Trip"}
          </Button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="" className="h-[35px]" />
                <h2 className="font-bold text-gray-400 text-lg mt-5">
                  Sign In With Google
                </h2>
                <p>Sign in to the App with Google authentication securely</p>

                <Button
                  onClick={login}
                  className="flex w-full items-center mt-5 gap-4"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>

            {/* ✅ Close Button */}
            <DialogClose asChild>
              <button className="absolute right-4 top-4 p-2 text-gray-600 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </>
  );
};

export default CreateTrip;
