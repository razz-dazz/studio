import StoreTabs from '@/components/store/store-tabs';
import { cueItems, feltItems } from '@/lib/constants';

export default function StorePage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter">Cosmetics Store</h1>
        <p className="text-muted-foreground">Customize your game with exclusive cues and felts.</p>
       </div>
      <StoreTabs cues={cueItems} felts={feltItems} />
    </div>
  );
}
