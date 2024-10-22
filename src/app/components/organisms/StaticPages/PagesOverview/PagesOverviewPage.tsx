import PagesOverviewProps from './PagesOverviewPage.types';
import './PagesOverviewPage.scss';

import { useContext } from 'react';

import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const PagesOverviewPage: React.FC<PagesOverviewProps> = () => {
  const { _configData } = useContext(ConfigDataContext);
  const { setActivePageId } = useContext(ActivePageIdContext);

  const pageLinks = _configData?.pages.map((page) => {
    return(
      <p key={page.id} className='page__link' onClick={() => setActivePageId(page.id)}>{page.id} - {page.title}</p>
    )
  });

  return (
    <div className='pages-overview'>
      <h2>All pages</h2>
      <div>
        {pageLinks}
      </div>
    </div>
  );
};

export default PagesOverviewPage;