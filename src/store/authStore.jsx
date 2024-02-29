import { create } from "zustand";

export const useAuthStore = create((set) => ({
  profile: JSON.parse(localStorage.getItem("profileData")),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  setAccessToken: (accessToken) => {
    set({ accessToken });
    localStorage.setItem("accessToken", accessToken);
  },
  setRefreshToken: (refreshToken) => {
    set({ refreshToken });
    localStorage.setItem("refreshToken", refreshToken);
  },
  setProfile: (profile) => {
    set({ profile });
    localStorage.setItem("profileData", JSON.stringify(profile));
  },
  logout: () => {
    set({ accessToken: null, refreshToken: null, profile: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profileData");
  },
}));
