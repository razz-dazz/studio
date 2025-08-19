import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins } from 'lucide-react';

interface Item {
  name: string;
  price: number;
  image: string;
  hint: string;
}

interface StoreTabsProps {
  cues: Item[];
  felts: Item[];
}

function ItemGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.name}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-md bg-secondary">
              <Image
                src={item.image}
                width={400}
                height={item.name.includes('Cue') ? 100 : 300}
                alt={item.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
                data-ai-hint={item.hint}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Coins className="h-5 w-5" />
              <span>{item.price.toLocaleString()}</span>
            </div>
            <Button>Purchase</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function StoreTabs({ cues, felts }: StoreTabsProps) {
  return (
    <Tabs defaultValue="cues">
      <TabsList>
        <TabsTrigger value="cues">Cues</TabsTrigger>
        <TabsTrigger value="felts">Table Felts</TabsTrigger>
      </TabsList>
      <TabsContent value="cues" className="mt-6">
        <ItemGrid items={cues} />
      </TabsContent>
      <TabsContent value="felts" className="mt-6">
        <ItemGrid items={felts} />
      </TabsContent>
    </Tabs>
  );
}
