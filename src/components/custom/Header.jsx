//Header
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
import { X, Sparkles } from 'lucide-react';

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
    <header className="flex items-center justify-between p-2 sm:p-3 px-3 sm:px-6 shadow-xs absolute top-0 left-0 right-0 z-50 bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#ff7e5f] rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-black">Planora.io</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <div className="flex items-center gap-1 sm:gap-3">
            <Button 
              variant="outline" 
              className="rounded-full text-xs sm:text-sm md:text-md px-2 sm:px-3 md:px-4 h-8 sm:h-9 md:h-10" 
              onClick={() => navigate('/my-trips')}
            >
              ✈️ <span className="hidden sm:inline ml-1 sm:ml-2">My Trips</span>
            </Button>
            <Separator orientation="vertical" className="h-5 sm:h-7 bg-gray-800 hidden sm:block" />
            <Button 
              variant="outline" 
              className="rounded-full text-xs sm:text-sm md:text-md px-2 sm:px-3 md:px-4 h-8 sm:h-9 md:h-10" 
              onClick={() => navigate('/create-trip')}
            >
              🧳 <span className="hidden sm:inline ml-1">Add Trip</span>
            </Button>
            <Separator orientation="vertical" className="h-5 sm:h-7 bg-gray-800 hidden sm:block" />

            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.picture}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
                    alt="User Avatar"
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-cover rounded-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48 sm:w-52 mt-2 p-3 sm:p-4">
                <ul className="flex flex-col gap-2 sm:gap-3">
                  <li className="text-sm sm:text-md font-semibold text-gray-800 truncate">
                    👋 Hey, <span className="hidden sm:inline">{user?.name}</span><span className="sm:hidden">{user?.name?.split(' ')[0]}</span>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="text-sm sm:text-md text-gray-700 cursor-pointer hover:text-red-500"
                  >
                    🚪 Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button 
            className="text-sm sm:text-base md:text-lg px-3 sm:px-4 h-8 sm:h-9 md:h-10" 
            onClick={() => setOpenDialog(true)}
          >
            🔐 <span className="hidden sm:inline ml-1">Sign In</span>
          </Button>
        )}
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[90%] sm:w-full max-w-md mx-auto">
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="SmartAI Trip Logo" className="h-[30px] sm:h-[35px]" />
              <h2 className="font-bold text-gray-400 text-base sm:text-lg mt-4 sm:mt-5">Sign In With Google</h2>
              <p className="text-sm sm:text-base">Sign in to the app securely using Google authentication.</p>

              <Button
                onClick={login}
                className="flex w-full items-center justify-center mt-4 sm:mt-5 gap-3 sm:gap-4 text-sm sm:text-base h-10 sm:h-11"
              >
                <FcGoogle className="h-6 w-6 sm:h-7 sm:w-7" />
                <span className="hidden sm:inline">Sign In With Google</span>
                <span className="sm:hidden">Sign In</span>
              </Button>
            </DialogDescription>
          </DialogHeader>

          {/* Close Button */}
          <DialogClose asChild>
            <button className="absolute right-3 sm:right-4 top-3 sm:top-4 p-2 text-gray-600 hover:text-black">
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
