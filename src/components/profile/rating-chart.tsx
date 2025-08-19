'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface RatingChartProps {
  data: { month: string; rating: number }[];
}

const chartConfig = {
  rating: {
    label: 'Rating',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function RatingChart({ data }: RatingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Rating Progression</CardTitle>
        <CardDescription>Your rating over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              domain={[Math.min(...data.map(d => d.rating)) - 200, 'dataMax + 100']}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="rating" fill="var(--color-rating)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
