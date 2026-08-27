import { cn } from "@/lib/utils";

export interface ChartPoint {
  label: string;
  value: number;
}

interface MiniChartProps {
  data: ChartPoint[];
  color: string;
  className?: string;
}

const WIDTH = 280;
const HEIGHT = 96;
const PAD = { top: 8, right: 8, bottom: 22, left: 28 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

function scaleMax(values: number[]) {
  const max = Math.max(...values, 0);
  if (max === 0) return 4;
  return Math.ceil(max * 1.25);
}

function yTicks(max: number) {
  const step = max <= 4 ? 1 : Math.ceil(max / 4);
  const ticks: number[] = [];
  for (let value = 0; value <= max; value += step) ticks.push(value);
  if (ticks[ticks.length - 1] !== max) ticks.push(max);
  return ticks.slice(0, 4);
}

function Grid({ max }: { max: number }) {
  const ticks = yTicks(max);

  return (
    <>
      {ticks.map((tick) => {
        const y = PAD.top + PLOT_H - (tick / max) * PLOT_H;
        return (
          <g key={tick}>
            <line
              x1={PAD.left}
              y1={y}
              x2={WIDTH - PAD.right}
              y2={y}
              stroke="currentColor"
              strokeDasharray="2 4"
              className="text-border/80"
            />
            <text
              x={PAD.left - 6}
              y={y + 3}
              textAnchor="end"
              className="fill-muted text-[9px]"
            >
              {tick}
            </text>
          </g>
        );
      })}
    </>
  );
}

function AxisLabels({ data, max }: { data: ChartPoint[]; max: number }) {
  return data.map((point, index) => {
    const x =
      data.length === 1
        ? PAD.left + PLOT_W / 2
        : PAD.left + (index / (data.length - 1)) * PLOT_W;

    return (
      <text
        key={`${point.label}-${index}`}
        x={x}
        y={HEIGHT - 4}
        textAnchor="middle"
        className="fill-muted text-[9px]"
      >
        {point.label}
      </text>
    );
  });
}

export function MiniBarChart({ data, color, className }: MiniChartProps) {
  const max = scaleMax(data.map((point) => point.value));
  const barWidth = Math.min(24, PLOT_W / data.length - 8);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("h-[76px] w-full", className)}
      aria-hidden
    >
      <Grid max={max} />
      {data.map((point, index) => {
        const height = max === 0 ? 0 : (point.value / max) * PLOT_H;
        const x = PAD.left + index * (PLOT_W / data.length) + (PLOT_W / data.length - barWidth) / 2;
        const y = PAD.top + PLOT_H - height;

        return (
          <rect
            key={`${point.label}-${index}`}
            x={x}
            y={y}
            width={barWidth}
            height={Math.max(height, point.value > 0 ? 4 : 0)}
            rx={3}
            fill={color}
            opacity={point.value > 0 ? 1 : 0.25}
          />
        );
      })}
      <AxisLabels data={data} max={max} />
    </svg>
  );
}

export function MiniLineChart({ data, color, className }: MiniChartProps) {
  const max = scaleMax(data.map((point) => point.value));

  const points = data.map((point, index) => {
    const x =
      data.length === 1
        ? PAD.left + PLOT_W / 2
        : PAD.left + (index / (data.length - 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (point.value / max) * PLOT_H;
    return { x, y, value: point.value };
  });

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("h-[88px] w-full", className)}
      aria-hidden
    >
      <Grid max={max} />
      <path d={path} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={point.value > 0 ? 3.5 : 2.5}
          fill={color}
          opacity={point.value > 0 ? 1 : 0.35}
        />
      ))}
      <AxisLabels data={data} max={max} />
    </svg>
  );
}
