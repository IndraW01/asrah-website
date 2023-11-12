import httpRequest from "./Api";

// ------- auth
export const login = (request) => {
  return httpRequest.post("/login", request);
};
export const me = () => {
  return httpRequest.get("/me");
};
export const logout = () => {
  return httpRequest.post("/logout");
};
