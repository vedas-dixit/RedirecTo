import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityFeedProps } from "../types/dashboard.types";
import { Clock } from "lucide-react";

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Clock className="h-5 w-5 text-orange-500" />
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg text-orange-500">{activity.flag}</span>
              <div>
                <p className="text-sm font-medium text-white">{activity.shortUrl}</p>
                <p className="text-xs text-zinc-400">{activity.country}</p>
              </div>
            </div>
            <span className="text-xs text-zinc-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);