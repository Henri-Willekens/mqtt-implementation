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
        {pages.length < 10 ? pageButtons : <img src='./icons/general/apps.svg' className='navigation__pages-overview' onClick={() => switchToPage('PagesOverview')} />}
      </div>
      <div className='navigation__block navigation__alerts'>
        <AlertBoxHeader type='alarm' status='unack' />
      </div>
      <div className='navigation__block navigation__other'>
        <div className='navigation__block__icons'>
          <Button value='Alerts' onClick={() => switchToPage('AlertLog')} extraClasses={ activePageId == 'AlertLog' ? 'active' : ''} />
        </div>
        <div>
          <Button value='Settings' onClick={() => switchToPage('Settings')} extraClasses={ activePageId == 'Settings' ? 'active' : ''} />
        </div>
      </div>
    </div>
  );
};

export default Header;