import React, { useMemo } from 'react';
import { FactorScoreResult } from '../types';
import { FACTORS } from '../data/diagnosticFramework';

interface RadarChartProps {
  factorScores: Record<string, FactorScoreResult>;
  size?: number;
  showNormBenchmark?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  factorScores,
  size = 460,
  showNormBenchmark = true
}) => {
  const center = size / 2;
  const radius = (size / 2) - 68; // margin for labels
  const totalAxes = FACTORS.length; // 8

  // Concentric levels (1 to 6 scale)
  const levels = [1, 2, 3, 4, 5, 6];

  // Helper to convert polar to cartesian
  const getCoordinates = (index: number, value: number, maxVal = 6) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Trainee Polygon Points
  const traineePoints = useMemo(() => {
    return FACTORS.map((factor, idx) => {
      const score = factorScores[factor.id]?.rawMean || 3;
      return getCoordinates(idx, score);
    });
  }, [factorScores, radius, center]);

  const traineePathString = useMemo(() => {
    return traineePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
  }, [traineePoints]);

  // Norm Baseline Points (e.g. standard mean ~4.0)
  const normPoints = useMemo(() => {
    return FACTORS.map((factor, idx) => {
      const normVal = factor.mean;
      return getCoordinates(idx, normVal);
    });
  }, [radius, center]);

  const normPathString = useMemo(() => {
    return normPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';
  }, [normPoints]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full select-none overflow-visible drop-shadow-sm"
        >
          {/* Background web/grid levels */}
          {levels.map((level) => {
            const points = FACTORS.map((_, idx) => {
              const pt = getCoordinates(idx, level);
              return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
            }).join(' ') + ' Z';

            return (
              <g key={`grid-level-${level}`}>
                <path
                  d={points}
                  fill={level % 2 === 0 ? '#f8fafc' : '#ffffff'}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray={level === 6 ? 'none' : '2,2'}
                />
                {/* Level label on top axis */}
                <text
                  x={center + 6}
                  y={center - (level / 6) * radius + 4}
                  className="text-[10px] fill-slate-500 font-mono"
                >
                  {level}점
                </text>
              </g>
            );
          })}

          {/* Radial axis lines */}
          {FACTORS.map((_, idx) => {
            const outer = getCoordinates(idx, 6);
            return (
              <line
                key={`axis-${idx}`}
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />
            );
          })}

          {/* Norm Benchmark Polygon */}
          {showNormBenchmark && (
            <g>
              <path
                d={normPathString}
                fill="#f1f5f9"
                fillOpacity="0.4"
                stroke="#94a3b8"
                strokeWidth="1.8"
                strokeDasharray="4,4"
              />
            </g>
          )}

          {/* Trainee Polygon */}
          <g>
            <path
              d={traineePathString}
              fill="rgba(37, 99, 235, 0.2)"
              stroke="#2563eb"
              strokeWidth="2.5"
              className="transition-all duration-500 ease-out"
            />
            {traineePoints.map((pt, idx) => {
              const factor = FACTORS[idx];
              const score = factorScores[factor.id];
              return (
                <g key={`point-${factor.id}`} className="group cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill="#1d4ed8"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-150"
                  />
                  {/* Subtle value tag near point */}
                  <text
                    x={pt.x}
                    y={pt.y - 8}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-blue-900 drop-shadow-xs pointer-events-none font-mono"
                  >
                    {score?.rawMean.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Vertex Axis Labels with Factor Name & Level Badge */}
          {FACTORS.map((factor, idx) => {
            const angle = (Math.PI * 2 / totalAxes) * idx - Math.PI / 2;
            const labelR = radius + 24;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);

            const score = factorScores[factor.id];
            const textAnchor = Math.abs(Math.cos(angle)) < 0.15 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';

            return (
              <g key={`label-${factor.id}`}>
                <text
                  x={lx}
                  y={ly - 4}
                  textAnchor={textAnchor}
                  className="text-[11.5px] font-bold fill-slate-900"
                >
                  {factor.name}
                </text>
                <text
                  x={lx}
                  y={ly + 9}
                  textAnchor={textAnchor}
                  className="text-[10px] font-semibold fill-blue-700 font-mono"
                >
                  {score ? `T:${score.tScore} (${score.levelLabel})` : ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center gap-6 mt-3 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-blue-600/20 border-2 border-blue-600"></span>
          <span className="font-bold text-slate-900">훈련생 진단 프로파일</span>
        </div>
        {showNormBenchmark && (
          <div className="flex items-center gap-2">
            <span className="w-4 border-t-2 border-dashed border-slate-400"></span>
            <span>현대직업전문학교 표준 규준 (T=50)</span>
          </div>
        )}
      </div>
    </div>
  );
};
