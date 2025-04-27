import React, { useState } from 'react';
import { PriceHistory } from '../types';

interface PriceChartProps {
  data: PriceHistory[];
}

export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const maxVolume = Math.max(...data.map(d => d.volume));
  const range = maxPrice - minPrice;

  const getY = (price: number) => {
    return 70 - ((price - minPrice) / range) * 60;
  };

  const getVolumeHeight = (volume: number) => {
    return (volume / maxVolume) * 20;
  };

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = getY(d.price);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-80">
      <div className="relative h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((position) => (
            <line
              key={position}
              x1={position}
              y1="0"
              x2={position}
              y2="70"
              stroke="#e5e7eb"
              strokeWidth="0.1"
            />
          ))}
          {[0, 23.33, 46.66, 70].map((position) => (
            <line
              key={position}
              x1="0"
              y1={position}
              x2="100"
              y2={position}
              stroke="#e5e7eb"
              strokeWidth="0.1"
            />
          ))}

          {/* Volume bars */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const height = getVolumeHeight(d.volume);
            return (
              <rect
                key={i}
                x={x - 0.5}
                y={70}
                width="1"
                height={height}
                fill="#e5e7eb"
              />
            );
          })}

          {/* Price line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.5"
          />

          {/* Interactive points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = getY(d.price);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredIndex === i ? "1.5" : "1"}
                fill={hoveredIndex === i ? "#2563EB" : "#3B82F6"}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute bg-white shadow-lg rounded-lg p-3 transform -translate-x-1/2 pointer-events-none"
            style={{
              left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
              top: "0",
            }}
          >
            <p className="font-semibold">
              R$ {data[hoveredIndex].price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Volume: {data[hoveredIndex].volume}
            </p>
            <p className="text-sm text-gray-500">
              {data[hoveredIndex].date}
            </p>
          </div>
        )}
      </div>

      {/* Date labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>{data[0].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
};