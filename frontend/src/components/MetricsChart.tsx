
//Graph and charts
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from "recharts";
import { format, parseISO } from "date-fns";
import { getPlatformColor } from "@/components/PlatformIcon";

interface MetricsChartProps {
  data: any[];
  dataKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 shadow-md rounded-md">
        <p className="font-medium">{format(parseISO(label), "MMM d, yyyy")}</p>
        <div className="mt-2">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize text-sm">{entry.name}: {entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// Platform colors map
const DEFAULT_COLORS = {
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  impressions: "#8884d8",
  engagement: "#82ca9d",
  clicks: "#ffc658",
  conversions: "#ff8042",
};

const MetricsChart = ({
  data,
  dataKeys,
  title,
  height = 300,
  colors,
}: MetricsChartProps) => {
  const customColors = colors || dataKeys.map(key => DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS] || "#8884d8");

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {dataKeys.map((key, index) => (
              <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={customColors[index]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={customColors[index]} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), "MMM d")}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={customColors[index]}
              fillOpacity={1}
              fill={`url(#color-${key})`}
              activeDot={{ r: 8 }}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
