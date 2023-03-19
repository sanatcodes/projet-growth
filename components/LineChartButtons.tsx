import React from 'react';

type LineChartButtonsProps = {
  lineChartType: number;
  setLineChartType: (type: number) => void;
};

const LineChartButtons: React.FC<LineChartButtonsProps> = ({
  lineChartType,
  setLineChartType,
}) => {
  return (
    <div className="flex gap-4 justify-center">
      <button
        className={`px-4 py-2 ${
          lineChartType === 0 ? 'bg-purple-700 text-white' : 'bg-gray-600'
        } rounded-lg`}
        onClick={() => setLineChartType(0)}
      >
        This Week
      </button>
      <button
        className={`px-4 py-2 ${
          lineChartType === 1 ? 'bg-purple-700 text-white' : 'bg-gray-600'
        } rounded-lg`}
        onClick={() => setLineChartType(1)}
      >
        Next Week
      </button>
      <button
        className={`px-4 py-2 ${
          lineChartType === 2 ? 'bg-purple-700 text-white' : 'bg-gray-600'
        } rounded-lg`}
        onClick={() => setLineChartType(2)}
      >
        2 Weeks
      </button>
    </div>
  );
};

export default LineChartButtons;
