import api from "./api";

export const AuthService = {
  async sendOtp(phone) {
    const { data } = await api.post("/auth/send-otp", { phone });
    return data;
  },

  async verifyOtp(phone, otp) {
    const { data } = await api.post("/auth/verify-otp", { phone, otp });
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};