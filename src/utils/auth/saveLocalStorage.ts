export const saveLocalStorage = (data: {}) => {
  localStorage.setItem(
    "@SURA-AUTH-REGISTER-INFO",
    JSON.stringify(data)
  );
};
