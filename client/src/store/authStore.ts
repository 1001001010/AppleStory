import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean; // Добавляем флаг для отслеживания гидратации
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      isHydrated: false,

      setAuth: (token, user) => set({ token, user }),

      clearAuth: () => set({ token: null, user: null }),

      setHydrated: () => set({ isHydrated: true }),

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login({ email, password });
          const { token, user } = response.data;
          set({ token, user, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(data);
          const { token, user } = response.data;
          set({ token, user, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      fetchProfile: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await authAPI.getProfile();
          set({ user: response.data.user });
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          set({ token: null, user: null });
        }
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
