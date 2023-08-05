import React from "react";

interface DotStepProps {
  value: number;
}

const DotStepLogin: React.FC<DotStepProps> = ({ value }) => {
  return (
    <div className="mb-5 flex items-center justify-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          value === 1 ? "bg-@sura-primary-900" : "bg-white"
        } border-2 border-@sura-primary-900`}
      />
      <div
        className={`w-3 h-3 rounded-full ${
          value === 2 ? "bg-@sura-primary-900" : "bg-white"
        } border-2 border-@sura-primary-900`}
      />
    </div>
  );
};

export default DotStepLogin;
