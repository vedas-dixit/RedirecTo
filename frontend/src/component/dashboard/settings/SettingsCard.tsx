import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, User } from "lucide-react";
import { Button } from "../../UI/button";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import SigninModal from "../../../modals/SigninModal";
import UpdateUserModal from "../../../modals/UpdateUserModal";
import Image from "next/image";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";

export const SettingsCard: React.FC<SettingsCardProps> = ({ isGuest }) => {
  const { user, signOut } = useAuth();
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openSigninModal = () => setIsSigninModalOpen(true);
  const closeSigninModal = () => setIsSigninModalOpen(false);
  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  // Close signin modal when user logs in
  useEffect(() => {
    if (user && isSigninModalOpen) {
      closeSigninModal();
    }
  }, [user, isSigninModalOpen]);

  const getUserDisplayName = () => {
    if (!user) return "Guest User";

    const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
    if (fullName) return fullName;

    return user.email || "User";
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  const getUserCountry = () => {
    // This would typically come from user metadata or geolocation
    return user?.user_metadata?.country || "US";
  };

  const getCountryFlag = (countryCode: string) => {
    // Convert country code to flag emoji
    const flagMap: { [key: string]: string } = {
      US: "🇺🇸",
      IN: "🇮🇳",
      UK: "🇬🇧",
      DE: "🇩🇪",
      FR: "🇫🇷",
      CA: "🇨🇦",
      AU: "🇦🇺",
      JP: "🇯🇵",
      BR: "🇧🇷",
      MX: "🇲🇽",
    };
    return flagMap[countryCode] || "🌍";
  };

  const handleSignIn = (): void => {
    openSigninModal();
  };

  const handleUpdateProfile = (): void => {
    openUpdateModal();
  };

  const handleLogout = (): void => {
    signOut();
  };

  return (
    <>
      <SigninModal isOpen={isSigninModalOpen} onClose={closeSigninModal} />
      <UpdateUserModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} />

      <Card className="bg-white/5 backdrop-blur-md border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <LiquidGlassWrapper>
            <div className="w-full h-full" />
          </LiquidGlassWrapper>
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-lg text-white/90">
            {isGuest ? "Account Options" : "Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-6">
          {isGuest ? (
            <div className="space-y-6">
              {/* Guest User Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-black/15 rounded-2xl">
                <div className="relative">
                  <div className="w-15 h-15 bg-gradient-to-br from-black/10 to-black/5 rounded-full flex items-center justify-center border-2 border-white/10">
                    <span className="text-white font-bold text-xl">G</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white/90 font-semibold text-lg truncate">
                    Guest User
                  </h3>
                  <p className="text-white/60 text-sm truncate">No email</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-white/90 hover:bg-white text-black border-0"
                  onClick={handleSignIn}
                >
                  Log In
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-black/15 rounded-2xl">
                <div className="relative">
                  {getUserAvatar() ? (
                    <Image
                      src={getUserAvatar()}
                      alt="User Avatar"
                      width={70}
                      height={70}
                      className="rounded-full border-2 border-black/20"
                    />
                  ) : (
                    <div className="w-15 h-15 bg-gradient-to-br from-black/10 to-black/5 rounded-full flex items-center justify-center border-2 border-white/10">
                      <span className="text-white font-bold text-xl">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white/90 font-semibold text-lg truncate">
                    {getUserDisplayName()}
                  </h3>
                  <p className="text-white/60 text-sm truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Bento Grid Actions */}
              <div className="grid grid-cols-3 gap-4">
                {/* Update Profile */}
                <div
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:bg-white/5 group"
                  onClick={handleUpdateProfile}
                >
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto group-hover:bg-yellow-200/80 transition-all">
                      <User className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">
                        Update Profile
                      </h4>
                    </div>
                  </div>
                </div>

                {/* User's Country Flag */}
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6  transition-all duration-300 cursor-pointer hover:bg-white/5 group">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-200/80 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-400/80 transition-all">
                      <span className="text-2xl">
                        {getCountryFlag(getUserCountry())}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">
                        User&apos;s country flag
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:bg-white/5 group"
                  onClick={handleLogout}
                >
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-red-400/80 rounded-full flex items-center justify-center mx-auto group-hover:bg-red-500/80 transition-all">
                      <LogOut className="h-6 w-6 text-red-200" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm">
                        Logout
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
