import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SummaryCardProps } from "../types/dashboard.types";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";
import { useThemeStyles } from "../../../hooks/useThemeStyles";

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
}) => {
  const styles = useThemeStyles();
  const gradients = styles.gradientAccents();
  
  return (
    <Card className={`${styles.glassmorphicCard('primary')} h-full group`}>
      {/* Gradient overlay for extra depth */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients.primary} opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`} />
      
      {/* Enhanced liquid glass effect */}
      <div className="absolute inset-0 opacity-40 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>
      
      {/* Glowing accent border */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradients.glow} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 pointer-events-none`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className={`text-sm font-medium ${styles.text('primary')} group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className={`text-2xl font-bold drop-shadow-sm mb-2 ${styles.text('primary')} group-hover:text-white/100 dark:group-hover:text-orange-100 transition-colors duration-300`}>
          {value}
        </div>
        <p className={`text-xs ${styles.text('muted')} group-hover:text-white/90 dark:group-hover:text-orange-200/80 transition-colors duration-300`}>{subtitle}</p>
      </CardContent>
    </Card>
  );
};
