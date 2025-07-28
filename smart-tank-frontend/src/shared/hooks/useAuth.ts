import { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import type { User } from '../../services/authService';

interface AuthState {
  user: (User & { id: number }) | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const user = AuthService.getUser();
    const token = AuthService.getToken();
    
    if (user && token) {
      setAuthState({
        user: user,
        token: token,
        isAuthenticated: true,
      });
    }
  }, []);

  return authState;
};
