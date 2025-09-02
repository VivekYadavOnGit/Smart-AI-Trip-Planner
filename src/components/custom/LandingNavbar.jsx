import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { X, Sparkles, MapPin } from "lucide-react";

 const Header = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    console.log("Current User in Navbar:", user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setOpenDialog(false);
    } catch (err) {
      console.error("❌ Failed to get user profile:", err);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Navigation */}
      <nav className="  p-3 px-6 absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-[#ff7e5f] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Planora.io</span>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/my-trips")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  My Trips
                </Button>

                <Button
                  className="bg-[#f56551] hover:bg-primary/90 text-primary-foreground shadow-glow"
                  onClick={() => navigate("/create-trip")}
                >
                  Add Trip
                </Button>

                {/* User Avatar + Popover */}
                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user?.picture}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "/profile.jpg";
                      }}
                      alt="User Avatar"
                      className="h-10 w-10 object-cover rounded-full ml-3 border border-white/40"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-52 mt-2 p-4">
                    <ul className="flex flex-col gap-3">
                      <li className="text-md font-semibold text-gray-800">
                        👋 Hey, {user?.name}
                      </li>
                      <li
                        onClick={handleLogout}
                        className="text-md text-gray-700 cursor-pointer hover:text-red-500"
                      >
                        🚪 Logout
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button
                className="bg-white text-black hover:bg-white/80"
                onClick={() => setOpenDialog(true)}
              >
                🔐 Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/logo.svg"
                alt="SmartAI Trip Logo"
                className="h-[35px]"
              />
              <h2 className="font-bold text-gray-400 text-lg mt-5">
                Sign In With Google
              </h2>
              <p>Sign in to the app securely using Google authentication.</p>

              <Button
                onClick={login}
                className="flex w-full items-center mt-5 gap-4"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>

          {/* Close Button */}
          <DialogClose asChild>
            <button className="absolute right-4 top-4 p-2 text-gray-600 hover:text-black">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;