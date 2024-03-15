import LogoutButton from '@/components/buttons/LogoutButton';
import TopMenu from '@/components/menus/TopMenu';
import { User } from '@/interfaces/User';
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const parsedUserData: User = JSON.parse(userDataString);
      setUser(parsedUserData);
    }
  }, []);

  return (
    <header className="bg-cyan-500 px-3 py-5">
      <div className="flex justify-between items-center">
        <h1>This is the Header</h1>
        <TopMenu/>
        <div>
          {user?.first_name} {user?.last_name}
          <LogoutButton/>
        </div>
      </div>
    </header>
  );
};

export default Header;
