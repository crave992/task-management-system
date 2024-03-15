import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/layouts/templates/Header';
import Footer from '@/components/layouts/templates/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title className="capitalize">Task management system</title>
        {/* Add your meta tags, stylesheets, scripts, etc. */}
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* Add any other global components or elements */}
    </div>
  );
};

export default MainLayout;
