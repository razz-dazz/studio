import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Star, ThumbsDown, ThumbsUp } from 'lucide-react';

interface PlayerStatsProps {
  stats: {
    rating: number;
    wins: number;
    losses: number;
    winRate: number;
  };
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
  const { rating, wins, losses, winRate } = stats;

  const statItems = [
    { title: 'Rating', value: rating, icon: Star },
    { title: 'Wins', value: wins, icon: ThumbsUp },
    { title: 'Losses', value: losses, icon: ThumbsDown },
    { title: 'Win Rate', value: `${winRate}%`, icon: BarChart2 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
