import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../UI/card";
import { GuestLimitCardProps } from "../types/dashboard.types";
import { User, X } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import AnimatedStarButton from "../../custom/AnimatedButton";

export const GuestLimitCard: React.FC<GuestLimitCardProps> = ({
  current,
  limit,
  setIsSigninModalOpen,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-4 z-50 max-w-sm">
      <Card className="bg-gradient-to-br from-orange-950/15 to-orange-900/20 border-orange-400/15 backdrop-blur-sm relative shadow-lg">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-orange-300/60 hover:text-orange-200/80 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <User className="h-5 w-5 text-orange-400/70" />
            Guest Limits
          </CardTitle>
          <CardDescription className="text-orange-100/70">
            You&apos;ve created {current}/{limit} temporary URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={(current / limit) * 100}
            className="mb-4 bg-orange-950"
          />
          <AnimatedStarButton
            className="w-64 text-white border-0"
            onClick={() => setIsSigninModalOpen(true)}
          >
            <div className="flex items-center justify-center p-4">
              Log In to make more URL&apos;s
            </div>
          </AnimatedStarButton>
        </CardContent>
      </Card>
    </div>
  );
};
