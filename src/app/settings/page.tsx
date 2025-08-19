import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Music, Settings, ToyBrick, Volume2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Tailor your Aether Eight experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ToyBrick className="text-primary" />
              Rule Sets
            </CardTitle>
            <CardDescription>Choose your preferred game rules.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="8-ball">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="8-ball" id="r1" />
                <Label htmlFor="r1">8-Ball (Standard)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="9-ball" id="r2" />
                <Label htmlFor="r2">9-Ball</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="straight-pool" id="r3" />
                <Label htmlFor="r3">Straight Pool</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="text-primary" />
              Audio
            </CardTitle>
            <CardDescription>Adjust game audio levels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>Master Volume</Label>
                <Slider defaultValue={[80]} />
            </div>
            <div className="space-y-2">
                <Label>Music</Label>
                <Slider defaultValue={[50]} />
            </div>
            <div className="space-y-2">
                <Label>Sound Effects</Label>
                <Slider defaultValue={[90]} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="text-primary" />
              Graphics
            </CardTitle>
            <CardDescription>Optimize visual quality.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
                <Label htmlFor="hq-textures">High Quality Textures</Label>
                <Switch id="hq-textures" defaultChecked />
             </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="bloom">Bloom Effect</Label>
                <Switch id="bloom" defaultChecked/>
             </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="shadows">Real-time Shadows</Label>
                <Switch id="shadows" />
             </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="fps-counter">Show FPS Counter</Label>
                <Switch id="fps-counter" />
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
