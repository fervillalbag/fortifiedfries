import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text } from "../../ui";
import { DotStep } from "./";

interface FooterProps {
  children: React.ReactNode;
  footerText: string;
  routeText: string;
  routeLink: string;
  currentStep: number;
}

const Footer: React.FC<FooterProps> = ({
  routeText,
  routeLink,
  footerText,
  children,
  currentStep,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-8 left-5 w-[calc(100%_-_40px)]">
      <DotStep value={currentStep} />
      <div className="grid grid-cols-2 gap-5">{children}</div>
      <div className="items-center justify-center mt-4 flex w-full gap-2">
        <Text>{footerText}</Text>
        <Button
          variant="link"
          onClick={() => navigate(routeLink, { replace: true })}
        >
          {routeText}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
