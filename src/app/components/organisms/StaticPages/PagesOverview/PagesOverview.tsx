import PagesOverviewProps from './PagesOverview.types';
import './PagesOverview.scss';

import { useContext } from 'react';

import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';

const PagesOverview: React.FC<PagesOverviewProps> = ({ 
  pages
}) => {
  const {setActivePageId} = useContext(ActivePageIdContext);

  const _pageLinks = pages.map((_page) => {
    return(
      <p className='page__link' onClick={() => setActivePageId(_page.id)}>{_page.id} - {_page.title}</p>
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

export default PagesOverview;