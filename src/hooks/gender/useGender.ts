import { useQuery } from "@tanstack/react-query";
import { getGenders } from "../../services";

export const useGender = () => {
  const queryGender = useQuery(["get-all-genders"], getGenders);
  return queryGender;
};
