import HeaderProps from './Header.types';
import './Header.scss';

import Button from '../../atoms/Button/Button';
import AlertBoxHeader from '../../atoms/AlertBoxHeader/AlertBoxHeader';

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
          <AlertBoxHeader type='alarm' status='unack' />
        </div>
      </div>
      <div className='navigation__block navigation__other'>
        <div className='navigation__block__icons'>
          <img className='navigation__block-icon' src='./icons/general/alerts.svg' alt='Alerts' />
          {/* <p className='navigation__block-number-alerts'>20</p> */}
        </div>
        <div className='navigation__block__icons'>
          <img className='navigation__block-icon' src='./icons/general/account.svg' alt='Account' />
        </div>
      </div>
    </div>
  );
};

export default Header;