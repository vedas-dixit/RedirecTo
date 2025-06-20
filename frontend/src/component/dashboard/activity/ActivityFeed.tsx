import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { ActivityFeedProps } from "../types/dashboard.types";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";
import { useThemeStyles } from "../../../hooks/useThemeStyles";

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const styles = useThemeStyles();
  const gradients = styles.gradientAccents();
  
  return (
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
        <CardTitle className={`flex items-center text-lg gap-2 ${styles.text('primary')} group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300`}>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        {!activities || activities.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-80 ${styles.text('muted')}`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 dark:from-orange-950/30 dark:to-orange-900/40 flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-orange-400/10">
                <svg
                  className="w-8 h-8 text-white/70 dark:text-orange-300/60"
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
              <h3 className={`text-lg font-medium ${styles.text('secondary')} mb-2`}>
                No Recent Activity
              </h3>
              <p className={`text-sm ${styles.text('muted')}`}>
                Create some URLs and share them to see recent activity here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-black/15 to-black/20 dark:from-orange-950/15 dark:to-orange-900/20 hover:from-black/20 hover:to-black/25 dark:hover:from-orange-950/25 dark:hover:to-orange-900/30 transition-all duration-300 border border-white/20 dark:border-orange-400/8 hover:border-white/30 dark:hover:border-orange-400/12 backdrop-blur-sm group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {activity.flag}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${styles.text('primary')} drop-shadow-sm group-hover:text-white/100 dark:group-hover:text-orange-100 transition-colors duration-300`}>
                      {activity.shortUrl}
                    </p>
                    <p className={`text-xs ${styles.text('muted')} group-hover:text-white/90 dark:group-hover:text-orange-200/80 transition-colors duration-300`}>{activity.country}</p>
                  </div>
                </div>
                <span className={`text-xs ${styles.text('muted')} group-hover:text-white/90 dark:group-hover:text-orange-200/80 transition-colors duration-300`}>{activity.time}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
