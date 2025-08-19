import InteractiveTable from '@/components/game/interactive-table';
import Matchmaker from '@/components/game/matchmaker';
import VirtualInstructor from '@/components/game/virtual-instructor';

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <InteractiveTable />
      </div>
      <div className="flex flex-col gap-8">
        <Matchmaker />
        <VirtualInstructor />
      </div>
    </div>
  );
}
