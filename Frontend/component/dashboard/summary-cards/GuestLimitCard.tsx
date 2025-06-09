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
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-4 z-50 max-w-sm">
      <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-500/30 backdrop-blur-sm relative shadow-lg">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-orange-400 hover:text-orange-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <User className="h-5 w-5 text-orange-500" />
            Guest Limits
          </CardTitle>
          <CardDescription className="text-zinc-300">
            You&apos;ve created {current}/{limit} temporary URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={(current / limit) * 100}
            className="mb-4 bg-zinc-800"
          />
          <AnimatedStarButton className="w-64 text-white border-0">
            <div className="flex items-center justify-center p-4">
              Login to make more URL&apos;s
            </div>
          </AnimatedStarButton>
        </CardContent>
      </Card>
    </div>
  );
};
