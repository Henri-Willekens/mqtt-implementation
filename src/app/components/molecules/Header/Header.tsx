import HeaderProps from './Header.types';
import './Header.scss';

import Button from '../../atoms/Button/Button';

const Header: React.FC<HeaderProps> = ({ pages, activePageId, navigateToPage }) => {

  const switchToPage = (id: string) => {
    navigateToPage(id);
  };

  const pageButtons = pages.map((_page) => {
    if (_page.id == activePageId) {
      return <Button key={_page.id} value={_page.title} onClick={() => switchToPage(_page.id)} extraClasses='active' />;
    } else {
      return <Button key={_page.id} value={_page.title} onClick={() => switchToPage(_page.id)} />;
    }
  });

  return(
    <div className='navigation'>
      <div className='navigation__block navigation__pages'>
        {pageButtons}
      </div>
      <div className='navigation__block navigation__alerts'>
        <div className='navigation__block-alert'>
          <p>GPS 1 failed</p>
        </div>
      </div>
      <div className='navigation__block navigation__other'>
      <img className="navigation__block-icon" src="./icons/general/alerts.svg" alt="Account" />
      <img className="navigation__block-icon" src="./icons/general/account.svg" alt="Account" />
      </div>
    </div>
  );
};

export default Header;