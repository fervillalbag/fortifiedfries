import { createContext, useState, useEffect } from "react";

interface WindowSizeProps {
  children: React.ReactNode;
}

export const WindowSizeContext = createContext<any>(null);

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const WindowSizeProvider: React.FC<WindowSizeProps> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider
      value={{
        windowSize,
      }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeProvider;
