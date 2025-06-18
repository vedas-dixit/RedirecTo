import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, Settings, User, UserPlus, Flag } from "lucide-react";
import { Button } from "../../UI/button";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Image from "next/image";

// Dynamic import for client-side only
const LiquidGlassWrapper = ({ children }: { children: React.ReactNode }) => {
  const [LiquidGlass, setLiquidGlass] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import("liquid-glass-react").then((module) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};

export const SettingsCard: React.FC<SettingsCardProps> = ({ isGuest }) => {
  const { user, signOut } = useAuth();

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

  const handleCreateAccount = (): void => {
    console.log("Create account");
  };

  const handleUpdateProfile = (): void => {
    console.log("Update profile");
  };

  const handleLogout = (): void => {
    signOut();
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-white/90">
          {isGuest ? "Account Options" : "Settings"}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 p-6">
        {isGuest ? (
          <div className="space-y-2">
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0"
              onClick={handleCreateAccount}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account to Save Analytics
            </Button>
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
                  <div className="w-15 h-15 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-white/10">
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
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto group-hover:bg-yellow-200/80 transition-all">
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
                  <div className="w-12 h-12 bg-blue-200/80 rounded-xl flex items-center justify-center mx-auto group-hover:bg-blue-400/80 transition-all">
                    <span className="text-2xl">
                      {getCountryFlag(getUserCountry())}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white/90 font-medium text-sm">
                      User's country flag
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
                  <div className="w-12 h-12 bg-red-400/80 rounded-xl flex items-center justify-center mx-auto group-hover:bg-red-500/80 transition-all">
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
  );
};
