import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Match {
  opponent: string;
  result: 'Win' | 'Loss';
  score: string;
  date: string;
}

interface RecentMatchesProps {
  matches: Match[];
}

export default function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Matches</CardTitle>
        <CardDescription>Your last 5 games.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opponent</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{match.opponent}</TableCell>
                <TableCell>
                  <Badge variant={match.result === 'Win' ? 'default' : 'destructive'} className={`${match.result === 'Win' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
                    {match.result}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">{match.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
