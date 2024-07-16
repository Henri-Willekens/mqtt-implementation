import React, { useState } from "react";

import HeaderProps from './Header.types';
import './Header.scss';

const Header: React.FC<HeaderProps> = ({ pages }) => {
  return (
    <div className='navigation'>
      <div className="navigation__block navigation__block-tabs">
        <img className="navigation__block-icon" src="./icons/navigation.svg" alt="Tab navigation" />
      </div>
      <div className="navigation__block navigation__block-other">
        <img className="navigation__block-icon" src="./icons/alerts.svg" alt="Alert tab" />
        <img className="navigation__block-icon" src="./icons/account.svg" alt="Account" />
        <img className="navigation__block-icon" src="./icons/settings.svg" alt="Settings" />
      </div>
    </div>
  );
};

export default Header;