// components/guard/AuthGuard.tsx

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      // Redirect to login page if token or refreshToken is missing
      router.push('/login');
    } else {
      const isTokenExpired = false; // Placeholder, implement actual logic

      if (isTokenExpired) {
        refreshTokens();
      }
    }
  }, []);

  const refreshTokens = async () => {
    try {
      const response = await fetch('/api/users/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
      } else {
        // Clear tokens and redirect to login page if refreshToken is invalid
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        router.push('/login');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return <>{children}</>;
};

export default AuthGuard;
