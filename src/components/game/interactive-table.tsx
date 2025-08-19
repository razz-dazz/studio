import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Maximize, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export default function InteractiveTable() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">Game Table</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ZoomIn />
            <span className="sr-only">Zoom In</span>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <ZoomOut />
            <span className="sr-only">Zoom Out</span>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <RotateCcw />
            <span className="sr-only">Reset View</span>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Camera />
            <span className="sr-only">Change Angle</span>
          </Button>
          <Button variant="ghost" size="icon" disabled>
            <Maximize />
            <span className="sr-only">Fullscreen</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border-2 border-primary/20 bg-secondary">
          <Image
            src="https://placehold.co/1280x720.png"
            width={1280}
            height={720}
            alt="Pool table"
            className="h-full w-full object-cover"
            data-ai-hint="pool table"
            priority
          />
        </div>
      </CardContent>
    </Card>
  );
}
