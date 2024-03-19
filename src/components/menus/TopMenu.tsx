import Link from 'next/link';
import { useState } from 'react';

const Menu: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Tasks', link: '/tasks' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center">
      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-50" // Added text-gray-50 class here
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Menu Items */}
      <ul className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="p-2">
            <Link href={item.link} className="text-gray-50 hover:border-b-2 border-transparent border-solid border-gray-50 hover:border-gray-50">
                {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
