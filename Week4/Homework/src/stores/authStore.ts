import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Part } from '../types/member';

interface AuthState {
  authorizationCode: string | null;
  part: Part | null;
  setAuth: (authorizationCode: string, part: Part) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authorizationCode: null,
      part: null,
      setAuth: (authorizationCode, part) => set({ authorizationCode, part }),
      clearAuth: () => set({ authorizationCode: null, part: null }),
    }),
    { name: 'auth-storage' }
  )
);
