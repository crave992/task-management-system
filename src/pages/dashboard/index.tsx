// pages/dashboard.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '@/components/guards/AuthGuard';
import MainLayout from '@/components/layouts/MainLayout';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    }
  }, []);

  return (
    <AuthGuard>
      <MainLayout>
        <div>
          <h1>Welcome to the Dashboard</h1>
          <p>This is the protected dashboard page.</p>
        </div>
      </MainLayout>
    </AuthGuard>
  );
};

export default DashboardPage;
