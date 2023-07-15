import React from "react";

/* Resource to save data in Local Storage */
/* https://frankmeszaros.medium.com/use-localstorage-and-formik-to-supercharge-your-form-experience-a175d68e5ecb */

export const useLocalStorageState = ({ key, value }: any) => {
  const parsedLocalStorage = JSON.parse(
    localStorage.getItem(key) || "{}"
  );

  const initialValue =
    Object.keys(parsedLocalStorage).length > 0
      ? parsedLocalStorage
      : value;

  const [localStorageState, setLocalStorageState] =
    React.useState(initialValue);

  const handleUpdateLocalStorageState = React.useCallback(
    (x: any) => {
      const newValue = { ...localStorageState, ...x };
      setLocalStorageState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  return [localStorageState, handleUpdateLocalStorageState];
};
