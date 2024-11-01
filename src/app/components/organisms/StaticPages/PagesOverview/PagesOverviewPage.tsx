import PagesOverviewProps from './PagesOverviewPage.types';
import './PagesOverviewPage.scss';

import { useContext } from 'react';

import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const PagesOverviewPage: React.FC<PagesOverviewProps> = () => {
  const { _configData } = useContext(ConfigDataContext);
  const { setActivePageId } = useContext(ActivePageIdContext);

  const pageLinks = (groupId: string) => {
    const pages: React.JSX.Element[] = [];

    _configData?.pages.map((page) => {
      if (page.group == groupId) {
        pages.push(
          <p key={page.id} className='page__link' onClick={() => setActivePageId(page.id)}>{page.id} - {page.title}</p>
        );
      }
    });

    return pages.length == 0 ? <p>No pages added to this group</p> : pages;
  };

  const setupGroups = _configData?.groups.map((group) => {
    return(
      <div className='pages-overview__block'>
        <p className='pages-overview__block-header'>{group.title}</p>
          {pageLinks(group.id)}
      </div>
    );
  });

  return (
    <div className='pages-overview'>
      <h2>All pages</h2>
      <div className='pages-overview__container'>
        {setupGroups}
        <div className='pages-overview__block'>
        <p className='pages-overview__block-header'>Pages with no group</p>
          {pageLinks('')}
      </div>
      </div>
    </div>
  );
};

export default PagesOverviewPage;