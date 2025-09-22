import React from "react";
import { HeaderProps } from "./models/header.models";
import './Header.css';

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header">
      <div className="header-content">
        {children && <div className="header-children">{children}</div>}
      </div>
    </header>
  );
};

export default Header;
