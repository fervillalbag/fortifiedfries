import jwtDecode from "jwt-decode";

export function getDataFromToken(token: string) {
  try {
    const datos = jwtDecode(token);
    return datos;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}
