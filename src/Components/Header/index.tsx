import React from "react";
import * as Components from "../";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <Components.Switch />
    </div>
  );
};

export default Header;
