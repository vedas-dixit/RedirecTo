import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, Settings, User, UserPlus } from "lucide-react";
import { Button } from "../../UI/button";
import { useState, useEffect } from "react";

// Dynamic import for client-side only
const LiquidGlassWrapper = ({ children }: { children: React.ReactNode }) => {
  const [LiquidGlass, setLiquidGlass] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import('liquid-glass-react').then((module) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};

export const SettingsCard: React.FC<SettingsCardProps> = ({ isGuest }) => {
  const handleCreateAccount = (): void => {
    console.log("Create account");
  };

  const handleUpdateProfile = (): void => {
    console.log("Update profile");
  };

  const handleChangeEmail = (): void => {
    console.log("Change email");
  };

  const handleLogout = (): void => {
    console.log("Logout");
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
      <CardContent className="relative z-10">
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
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-none text-zinc-300  bg-black/10"
              onClick={handleUpdateProfile}
            >
              <User className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-none text-zinc-300 bg-black/10"
              onClick={handleChangeEmail}
            >
              <Settings className="h-4 w-4 mr-2" />
              Change Email
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-none text-zinc-300 bg-black/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
