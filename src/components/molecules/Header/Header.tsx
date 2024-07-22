import React from "react";
import Button from "../../atoms/Button/Button";
import HeaderProps from './Header.types';
import './Header.scss';

const Header: React.FC<HeaderProps> = ({ pages, navigateToPage }) => {
  const switchToPage = (id: number) => {
    navigateToPage(id);
  };

  const pageButtons = pages.map((page) => {
    for (let i = 0; i < pages.length; i++) {
        return <Button key={page.id} onClick={() => switchToPage(page.id)} text={page.title} />
    }
  });

  return (
    <div className='navigation'>
      <div className="navigation__block navigation__block-tabs">
        <img className="navigation__block-icon" src="./icons/general/navigation.svg" alt="Tab navigation" />
      </div>
      <div className="navigation__block navigation__block-pages">
        {pageButtons}
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