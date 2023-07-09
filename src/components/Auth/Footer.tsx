import React from "react";
import { Link } from "react-router-dom";

import { Text } from "../../ui";

interface FooterProps {
  children: React.ReactNode;
  footerText: string;
  routeText: string;
  routeLink: string;
}

const Footer: React.FC<FooterProps> = ({
  routeText,
  routeLink,
  footerText,
  children,
}) => {
  return (
    <div className="fixed bottom-8 left-5 w-[calc(100%_-_40px)]">
      <div className="grid grid-cols-2 gap-5">{children}</div>
      <Text className="text-center mt-4">
        {footerText} <Link to={routeLink}>{routeText}</Link>
      </Text>
    </div>
  );
};

export default Footer;
