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
    <div className="h-40 relative">
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="bg-white absolute top-0 left-0 w-full h-full opacity-40" />
      </div>

      <div className="relative z-20 p-5 grid items-end h-full content-end">
        <Text
          className={textVariants({
            variant: "heading",
            className: "mb-1",
          })}
        >
          {title}
        </Text>
        <Text className="text-@sura-primary">
          <span dangerouslySetInnerHTML={{ __html: subtitle }} />
        </Text>
      </div>
    </div>
  );
};

export default Header;
