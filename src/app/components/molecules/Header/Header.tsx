import React, { useState } from "react";

import HeaderProps from './Header.types';
import './Header.scss';

const Header: React.FC<HeaderProps> = ({ pages }) => {
  return (
    <div className='navigation'>
      <div className="navigation__block navigation__block-tabs">
        <img className="navigation__block-icon" src="./icons/general/navigation.svg" alt="Tab navigation" />
      </div>
      <div className="navigation__block navigation__block-other">
        <img className="navigation__block-icon" src="./icons/general/alerts.svg" alt="Alert tab" />
        <img className="navigation__block-icon" src="./icons/general/account.svg" alt="Account" />
        <img className="navigation__block-icon" src="./icons/general/settings.svg" alt="Settings" />
      </div>
    </div>
  );
};

export default Header;