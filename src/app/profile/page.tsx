import PlayerStats from '@/components/profile/player-stats';
import RatingChart from '@/components/profile/rating-chart';
import RecentMatches from '@/components/profile/recent-matches';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { playerStats, ratingHistory, recentMatches } from '@/lib/constants';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src="https://placehold.co/80x80.png" alt="User" data-ai-hint="avatar user"/>
          <AvatarFallback>ZC</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter">ZeroCool</h1>
          <p className="text-muted-foreground">Master of the Digital Felt</p>
        </div>
      </div>
      
      <PlayerStats stats={playerStats} />
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RatingChart data={ratingHistory} />
        </div>
        <div className="lg:col-span-2">
          <RecentMatches matches={recentMatches} />
        </div>
      </div>
    </div>
  );
}
