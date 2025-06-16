import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SettingsCardProps } from "../types/dashboard.types";
import { LogOut, Settings, User, UserPlus } from "lucide-react";
import { Button } from "../../UI/button";

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
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Settings className="h-5 w-5 text-orange-500" />
          {isGuest ? "Account Options" : "Settings"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={handleUpdateProfile}
            >
              <User className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={handleChangeEmail}
            >
              <Settings className="h-4 w-4 mr-2" />
              Change Email
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
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
