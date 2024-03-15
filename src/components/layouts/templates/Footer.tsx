import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Your footer content goes here */}
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
