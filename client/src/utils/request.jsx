import axios from "axios";

export async function loginUser(email, password) {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  localStorage.setItem('token', data.cookie);
  return data;
}

export async function signupUser(form) {
  const res = await axios.post("/user/create", form);
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  localStorage.setItem('token', data.cookie);
  return data;
}

export async function checkAuthStatus() {
  const token = localStorage.getItem('token');
  const res = await axios.post("/user/auth-status", { token });
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
}


export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.post("/user/logout", { token });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  localStorage.removeItem('token');
  return data;
}