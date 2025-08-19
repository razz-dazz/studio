'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Lightbulb, Loader2 } from 'lucide-react';
import { suggestShot, type SuggestShotOutput } from '@/ai/flows/suggest-shot';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function VirtualInstructor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestShotOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const formData = new FormData(e.currentTarget);
    const tableState = formData.get('table-state') as string;
    const skillLevel = formData.get('player-skill') as string;

    if (!tableState || !skillLevel) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please describe the table state and select your skill level.',
      });
      setLoading(false);
      return;
    }

    try {
      const res = await suggestShot({
        tableStateDescription: tableState,
        playerSkillLevel: skillLevel,
      });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Error',
        description: 'Could not generate a shot suggestion. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSuggestion}>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            Virtual Instructor
          </CardTitle>
          <CardDescription>Get an AI-powered shot suggestion.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="table-state">Table State</Label>
            <Textarea
              id="table-state"
              name="table-state"
              placeholder="e.g., Cue ball near center. 8-ball is open in top-left pocket. 3 solid balls remain..."
              disabled={loading}
              required
            />
          </div>
          <div>
            <Label htmlFor="player-skill">Player Skill</Label>
            <Select name="player-skill" defaultValue="intermediate" disabled={loading} required>
              <SelectTrigger id="player-skill">
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {result && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Suggested Shot</AlertTitle>
              <AlertDescription>
                <p className="mt-2 text-sm">{result.suggestedShotDescription}</p>
                {result.diagramDataUri && (
                   <div className="mt-4 rounded-lg border bg-secondary p-2">
                     <Image
                        src={result.diagramDataUri}
                        width={400}
                        height={250}
                        alt="Shot Diagram"
                        className="mx-auto rounded-md"
                     />
                   </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              'Suggest Shot'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
