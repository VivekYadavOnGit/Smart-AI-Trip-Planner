import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
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
import {
  googleLogout,
  useGoogleLogin
} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    console.log("Current User in Header:", user);
    console.log('User data:', user);
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
            Accept: 'application/json',
          },
        }
      );

      console.log("✅ User Profile:", res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      setOpenDialog(false);
    } catch (err) {
      console.error("❌ Failed to get user profile:", err);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between p-3 px-6 shadow-xs absolute top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="SmartAI Trip Logo" className="h-10" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full text-md" onClick={() => navigate('/my-trips')}>
              ✈️ <span className="ml-2">My Trips</span>
            </Button>
            <Separator orientation="vertical" className="h-7 bg-gray-800" />
            <Button variant="outline" className="rounded-full text-md" onClick={() => navigate('/create-trip')}>
              🧳 <span className="ml-1">Add Trip</span>
            </Button>
            <Separator orientation="vertical" className="h-7 bg-gray-800" />

            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.picture}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
                    alt="User Avatar"
                    className="h-10 w-10 object-cover rounded-full"
                  />


                </div>
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
          </div>
        ) : (
          <Button className="text-lg" onClick={() => setOpenDialog(true)}>
            🔐 <span className="ml-1">Sign In</span>
          </Button>
        )}
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="SmartAI Trip Logo" className="h-[35px]" />
              <h2 className="font-bold text-gray-400 text-lg mt-5">Sign In With Google</h2>
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
    </header>
  );
}

export default Header;
