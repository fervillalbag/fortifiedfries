import React from "react";
import { Text, textVariants } from "../../ui";

interface HeaderProps {
  image: string;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({
  image,
  title,
  subtitle,
}) => {
  return (
    <div
      className={`h-40 relative bg-red-50 bg-[url('${image}')] bg-cover bg-center`}
    >
      <div className="bg-white absolute top-0 left-0 w-full h-full opacity-50" />

      <div className="relative z-20 p-5 grid items-end h-full content-end">
        <Text
          className={textVariants({
            variant: "heading",
            className: "mb-1",
          })}
        >
          {title}
        </Text>
        <Text>
          <span dangerouslySetInnerHTML={{ __html: subtitle }} />
        </Text>
      </div>
    </div>
  );
};

export default Header;
