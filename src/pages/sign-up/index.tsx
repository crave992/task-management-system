import React, { useEffect } from 'react';
import SignUpComponent from '@/components/forms/SignUpComponent';
import { User } from '@/interfaces/User';
import { useRouter } from 'next/router';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    if (token && refreshToken && user) {
      router.push('/dashboard');
    }
  }, [router]);
  const handleSubmit = async (userData: User) => {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to sign up:', (error as Error).message);
    }
  };

  return (
    <SignUpComponent onSubmit={handleSubmit} />
  );
};

export default SignUpPage;
