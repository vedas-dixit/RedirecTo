import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, Globe, LogIn } from "lucide-react";
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

  const handleSignIn = (): void => {
    openSigninModal();
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
              {/* Logout */}
                <div
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:bg-red-500/10 group relative overflow-hidden"
                  onClick={handleSignIn}
                >
     
     
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-red-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-600 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 border border-white/10">
                      <LogIn className="h-6 w-6 text-red-200 group-hover:text-red-100 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-300">
                        LogIn
                      </h4>
                      <p className="text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        Sign out safely
                      </p>
                    </div>
                  </div>
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
              <div className="grid grid-cols-2 gap-4">
                {/* Global Network (replacing country flag) */}
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:bg-white/5 group relative overflow-hidden">
                  {/* Subtle floating dots */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                  <div className="absolute top-3 right-3 w-1 h-1 bg-cyan-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 group-hover:animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500 group-hover:animate-pulse"></div>
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-200/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-400/30 group-hover:scale-105 transition-all duration-500 border border-white/10">
                      <Globe className="h-6 w-6 text-blue-200 group-hover:text-blue-100 transition-all duration-300 group-hover:rotate-12" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-300">
                        Global Network
                      </h4>
                      <p className="text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        Worldwide reach
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:bg-red-500/10 group relative overflow-hidden"
                  onClick={handleLogout}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Subtle floating particles */}
                  <div className="absolute top-2 right-2 w-1 h-1 bg-red-300/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-bounce"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-red-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 group-hover:animate-bounce"></div>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-red-400/5 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                  
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-red-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-red-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 border border-white/10">
                      <LogOut className="h-6 w-6 text-red-200 group-hover:text-red-100 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-300">
                        Logout
                      </h4>
                      <p className="text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        Sign out safely
                      </p>
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