import PagesOverviewProps from './PagesOverviewPage.types';
import './PagesOverviewPage.scss';

import { useContext } from 'react';

import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const PagesOverviewPage: React.FC<PagesOverviewProps> = () => {
  const { _configData } = useContext(ConfigDataContext);
  const { setActivePageId } = useContext(ActivePageIdContext);

  const _pageLinks = _configData?.pages.map((_page) => {
    return(
      <p key={_page.id} className='page__link' onClick={() => setActivePageId(_page.id)}>{_page.id} - {_page.title}</p>
    )
  });

  return (
    <div className='pages-overview'>
      <h2>All pages</h2>
      <div>
        {_pageLinks}
      </div>
    </div>
  );
};

export default PagesOverviewPage;