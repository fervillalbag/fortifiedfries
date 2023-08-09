import React from "react";

interface DotStepProps {
  value: number;
  count: number;
}

const DotStep: React.FC<DotStepProps> = ({ value, count }) => {
  const ghostArray = Array.from(
    { length: count },
    (_, index) => index + 1
  );

  return (
    <div className="mb-5 flex items-center justify-center gap-2">
      {ghostArray.map((item) => (
        <div
          key={item}
          className={`w-3 h-3 rounded-full ${
            value === item ? "bg-@sura-primary-900" : "bg-white"
          } border-2 border-@sura-primary-900`}
        />
      ))}
    </div>
  );
};

export default DotStep;
