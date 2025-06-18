import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { ActivityFeedProps } from "../types/dashboard.types";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => (
  <Card className="bg-white/5 backdrop-blur-xl border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <LiquidGlassWrapper>
        <div className="w-full h-full" />
      </LiquidGlassWrapper>
    </div>
    <CardHeader className="relative z-10">
      <CardTitle className="flex items-center text-lg gap-2 text-white/90">
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      {!activities || activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-white/70">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white/80 mb-2">
              No Recent Activity
            </h3>
            <p className="text-sm text-white/60">
              Create some URLs and share them to see recent activity here
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg bg-black/10 hover:bg-white/15 transition-colors border border-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg text-white drop-shadow-sm">
                  {activity.flag}
                </span>
                <div>
                  <p className="text-sm font-medium text-white drop-shadow-sm">
                    {activity.shortUrl}
                  </p>
                  <p className="text-xs text-white/70">{activity.country}</p>
                </div>
              </div>
              <span className="text-xs text-white/70">{activity.time}</span>
            </div>
          ))}{" "}
        </div>
      )}
    </CardContent>
  </Card>
);
