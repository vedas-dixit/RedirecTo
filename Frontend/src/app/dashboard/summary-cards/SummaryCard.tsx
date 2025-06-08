import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryCardProps } from "../types/dashboard.types";

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => (
  <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-zinc-100">{title}</CardTitle>
      <Icon className="h-4 w-4 text-orange-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-zinc-400">{subtitle}</p>
    </CardContent>
  </Card>
);

