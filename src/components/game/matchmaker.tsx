'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Loader2, Swords, UserCheck } from 'lucide-react';
import { matchOpponent, type MatchOpponentOutput } from '@/ai/flows/match-opponent';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function Matchmaker() {
  const [skillLevel, setSkillLevel] = useState(50);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchOpponentOutput | null>(null);
  const { toast } = useToast();

  const handleMatchmaking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await matchOpponent({ playerSkillLevel: skillLevel });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Matchmaking Error',
        description: 'Could not find an opponent. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleMatchmaking}>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Swords className="text-primary" />
            AI Matchmaker
          </CardTitle>
          <CardDescription>Find an opponent of similar skill.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skill-level">Your Skill Level: {skillLevel}</Label>
              <Slider
                id="skill-level"
                min={1}
                max={100}
                step={1}
                value={[skillLevel]}
                onValueChange={(value) => setSkillLevel(value[0])}
                disabled={loading}
              />
            </div>
            {result && (
              <Alert>
                <UserCheck className="h-4 w-4" />
                <AlertTitle>Opponent Found!</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 list-disc list-inside text-sm">
                    <li>ID: {result.opponentDetails.opponentId.slice(0, 8)}...</li>
                    <li>Skill Level: {result.opponentDetails.opponentSkillLevel}</li>
                    <li>Est. Wait: {result.opponentDetails.estimatedWaitTime}s</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Find Match'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
