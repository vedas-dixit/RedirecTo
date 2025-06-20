import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, Globe, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import SigninModal from "../../../modals/SigninModal";
import UpdateUserModal from "../../../modals/UpdateUserModal";
import Image from "next/image";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";
import { useThemeStyles } from "../../../hooks/useThemeStyles";

export const SettingsCard: React.FC<SettingsCardProps> = ({ isGuest }) => {
  const { user, signOut } = useAuth();
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const styles = useThemeStyles();
  const gradients = styles.gradientAccents();

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

      <Card className={`${styles.glassmorphicCard('primary')} h-full group`}>
        {/* Orange gradient overlay for extra depth */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients.primary} opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`} />
        
        <div className="absolute inset-0 opacity-40 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none">
          <LiquidGlassWrapper>
            <div className="w-full h-full" />
          </LiquidGlassWrapper>
        </div>
        
        {/* Orange glowing accent border */}
        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradients.glow} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 pointer-events-none`} />
        
        <CardHeader className="relative z-10">
          <CardTitle className={`flex items-center gap-2 text-lg ${styles.text('primary')} group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300`}>
            {isGuest ? "Account Options" : "Settings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 p-6">
          {isGuest ? (
            <div className="space-y-6">
              {/* Guest User Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-black/15 to-black/20 dark:from-orange-950/20 dark:to-orange-900/25 rounded-2xl backdrop-blur-sm ">
                <div className="relative">
                  <div className="w-15 h-15 bg-gradient-to-br from-black/20 to-black/30 dark:from-orange-950/30 dark:to-orange-900/40 rounded-full flex items-center justify-center">
                    <span className={`font-bold text-xl ${styles.text('primary')}`}>G</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg truncate ${styles.text('primary')}`}>
                    Guest User
                  </h3>
                  <p className={`text-sm truncate ${styles.text('muted')}`}>No email</p>
                </div>
              </div>
              {/* login */}
              <div
                className="bg-gradient-to-br from-black/15 to-black/20 dark:from-orange-950/20 dark:to-orange-900/25 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:from-black/25 hover:to-black/30 dark:hover:from-orange-950/30 dark:hover:to-orange-900/35 group relative overflow-hidden dark:border-orange-400/8 dark:hover:border-orange-400/15"
                onClick={handleSignIn}
              >
                {/* Glass reflection effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="absolute top-2 left-2 text-xs text-white/40 dark:text-orange-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse font-mono">
                  https://
                </div>
                <div className="absolute top-4 right-3 text-xs text-white/35 dark:text-orange-200/35 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 group-hover:animate-pulse font-mono">
                  .com
                </div>
                <div className="absolute bottom-3 left-4 text-xs text-white/40 dark:text-orange-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400 group-hover:animate-pulse font-mono">
                  /login
                </div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-white/60 dark:bg-orange-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 group-hover:animate-bounce"></div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 border border-white/50 dark:border-orange-300/30 rounded rotate-45 group-hover:animate-spin"></div>
                  <div className="absolute top-3/4 right-1/4 w-1 h-1 border border-white/50 dark:border-orange-300/30 rounded rotate-45 group-hover:animate-spin animation-delay-500"></div>
                </div>

                <div className="relative z-10 text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400/40 to-red/50 dark:from-orange-600/25 dark:to-orange-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto group-hover:from-red-400/60 group-hover:to-red-500/70 dark:group-hover:from-orange-600/40 dark:group-hover:to-orange-500/45 group-hover:scale-105 transition-all duration-500 border border-white/40 dark:border-orange-400/20">
                    <LogIn className="h-6 w-6 text-white/80 dark:text-orange-200/80 group-hover:text-white/100 dark:group-hover:text-orange-100 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className={`font-medium text-sm group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300 ${styles.text('primary')}`}>
                      Sign In
                    </h4>
                    <p>
                      <span className={`text-xs transition-all duration-300 delay-100 ${styles.text('muted')} group-hover:text-white/90 dark:group-hover:text-orange-200/80`}>
                        Sign in to unlock true potential
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/15 to-white/20 dark:from-orange-950/20 dark:to-orange-900/25 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-orange-400/10">
                <div className="relative">
                  {getUserAvatar() ? (
                    <Image
                      src={getUserAvatar()}
                      alt="User Avatar"
                      width={70}
                      height={70}
                      className="rounded-full border-2 border-white/40 dark:border-orange-400/20"
                    />
                  ) : (
                    <div className="w-15 h-15 bg-gradient-to-br from-white/20 to-white/30 dark:from-orange-950/30 dark:to-orange-900/40 rounded-full flex items-center justify-center border-2 border-white/40 dark:border-orange-400/20">
                      <span className={`font-bold text-xl ${styles.text('primary')}`}>
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-lg truncate ${styles.text('primary')}`}>
                    {getUserDisplayName()}
                  </h3>
                  <p className={`text-sm truncate ${styles.text('muted')}`}>
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Bento Grid Actions */}
              <div className="grid grid-cols-2 gap-4">
                {/* Global Network */}
                <div className="bg-gradient-to-br from-white/15 to-white/20 dark:from-orange-950/20 dark:to-orange-900/25 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:from-white/25 hover:to-white/30 dark:hover:from-orange-950/30 dark:hover:to-orange-900/35 group relative overflow-hidden border border-white/30 dark:border-orange-400/10 hover:border-white/40 dark:hover:border-orange-400/15">
                  {/* Subtle floating dots */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white/50 dark:bg-orange-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-pulse"></div>
                  <div className="absolute top-3 right-3 w-1 h-1 bg-white/60 dark:bg-orange-300/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 group-hover:animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/50 dark:bg-orange-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500 group-hover:animate-pulse"></div>

                  {/* Glass reflection effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/50 dark:from-orange-600/20 dark:to-orange-500/25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:from-white/60 group-hover:to-white/70 dark:group-hover:from-orange-600/35 dark:group-hover:to-orange-500/40 group-hover:scale-105 transition-all duration-500 border border-white/40 dark:border-orange-400/20">
                      <Globe className="h-6 w-6 text-white/80 dark:text-orange-200/80 group-hover:text-white/100 dark:group-hover:text-orange-100 transition-all duration-300 group-hover:rotate-12" />
                    </div>
                    <div>
                      <h4 className={`font-medium text-sm group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300 ${styles.text('primary')}`}>
                        Global Network
                      </h4>
                      <p className={`text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 ${styles.text('muted')} group-hover:text-white/90 dark:group-hover:text-orange-200/80`}>
                        Worldwide reach
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <div
                  className="bg-gradient-to-br from-white/15 to-white/20 dark:from-orange-950/20 dark:to-orange-900/25 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:from-red-200/25 hover:to-red-300/30 dark:hover:from-red-900/35 dark:hover:to-red-800/45 group relative overflow-hidden border border-white/30 dark:border-orange-400/10 hover:border-red-300/40 dark:hover:border-red-400/40"
                  onClick={handleLogout}
                >
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/50 dark:from-orange-600/20 dark:to-orange-500/25 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto group-hover:from-red-500/50 group-hover:to-red-600/60 group-hover:scale-105 transition-all duration-500 border border-white/40 dark:border-orange-400/20 group-hover:border-red-400/40">
                      <LogOut className="h-6 w-6 text-white/80 dark:text-orange-200/80 group-hover:text-red-100 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className={`font-medium text-sm group-hover:text-red-100 transition-colors duration-300 ${styles.text('primary')}`}>
                        Logout
                      </h4>
                      <p className={`text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 ${styles.text('muted')} group-hover:text-red-200`}>
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
