import './PageManager.scss';
import PageManagerProps from './PageManager.types';

import { useContext } from 'react';

import Page from '../Page/Page';
import SettingsPage from '../StaticPages/Settings/Settings';
import PagesOverviewPage from '../StaticPages/PagesOverview/PagesOverview';
import AlertLogPage from '../StaticPages/AlertLog/AlertLog';

import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const PageManager: React.FC<PageManagerProps> = () => {
  const { _activePageId } = useContext(ActivePageIdContext);
  const { _configData } = useContext(ConfigDataContext);

  // Determine several "static" pages, these aren't configurable and should always exist
  const STATIC_PAGES: {[key: string]: { component: React.FC<any>, props?: Record<string, any>}} =  {
    Settings: {
      component: SettingsPage,
    },
    PagesOverview: {
      component: PagesOverviewPage,
    },
    AlertLog: {
      component: AlertLogPage,
    }
  };
  const _staticPage = STATIC_PAGES[_activePageId]

  return(
    <>
      {_staticPage ? (
        <_staticPage.component { ..._staticPage.props } />
      ) : (
        _configData?.pages.map((_page, _index) => 
          _page.id === _activePageId ? (
            <Page
              key={_index}
              pageId={_page.id}
              title={_page.title}
              gridEnabled={_page.gridEnabled}
              components={_page.components}
              connections={_page.connections}
            />
          ) : null)
      )}
    </>
  )
};

export default PageManager;