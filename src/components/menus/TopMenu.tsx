import Link from 'next/link';

const Menu: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Tasks', link: '/tasks' },
  ];

  return (
    <nav>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.link}>
         {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
