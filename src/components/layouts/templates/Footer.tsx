import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 bg-gray-400 mt-5">
      {/* Your footer content goes here */}
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
