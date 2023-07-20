import { useContext } from "react";
import { WindowSizeContext } from "../context";

export const useHeight = () => {
  const { windowSize } = useContext(WindowSizeContext);
  return { height: `${windowSize.innerHeight / 16}rem` };
};
