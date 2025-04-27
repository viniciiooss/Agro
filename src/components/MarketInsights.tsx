import React from 'react';
import { MapPin, DollarSign, LineChart, Truck } from 'lucide-react';

interface MarketInsightsProps {
  darkMode: boolean;
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({ darkMode }) => {
  const insights = [
    {
      icon: <MapPin className="w-6 h-6 text-green-600" />,
      type: 'Environmental',
      impact: 'High Impact',
      title: 'Weather Impact',
      description: 'Upcoming drought conditions in major producing regions may impact yields and drive prices up.',
      impactColor: 'bg-red-100 text-red-800',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      type: 'Economic',
      impact: 'Medium Impact',
      title: 'Export Demand',
      description: 'Strong international demand is expected to continue, supporting price levels for major commodities.',
      impactColor: 'bg-orange-100 text-orange-800',
    },
    {
      icon: <LineChart className="w-6 h-6 text-green-600" />,
      type: 'Political',
      impact: 'Medium Impact',
      title: 'Policy Changes',
      description: 'New agricultural subsidy programs being introduced may stabilize certain commodity prices.',
      impactColor: 'bg-orange-100 text-orange-800',
    },
    {
      icon: <Truck className="w-6 h-6 text-green-600" />,
      type: 'Logistical',
      impact: 'Low Impact',
      title: 'Supply Chain',
      description: 'Logistics improvements are reducing transportation costs, potentially lowering final market prices.',
      impactColor: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="mt-8">
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Market Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {insight.icon}
                </div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {insight.type}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode
                    ? insight.impact === 'High Impact'
                      ? 'bg-red-900 text-red-200'
                      : insight.impact === 'Medium Impact'
                      ? 'bg-orange-900 text-orange-200'
                      : 'bg-green-900 text-green-200'
                    : insight.impactColor
                }`}
              >
                {insight.impact}
              </span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {insight.title}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {insight.description}
            </p>
            <button
              className={`mt-4 text-sm font-medium flex items-center ${
                darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
              }`}
            >
              Read analysis
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};