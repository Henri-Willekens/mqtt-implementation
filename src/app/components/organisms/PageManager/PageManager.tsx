import './PageManager.scss';
import PageManagerProps from './PageManager.types';

import { useContext } from 'react';

import Page from '../Page/Page';
import SettingsPage from '../StaticPages/Settings/SettingsPage';
import PagesOverviewPage from '../StaticPages/PagesOverview/PagesOverviewPage';
import AlertLogPage from '../StaticPages/AlertLog/AlertLogPage';

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
  const staticPage = STATIC_PAGES[_activePageId]

  return(
    <>
      {staticPage ? (
        <staticPage.component { ...staticPage.props } />
      ) : (
        _configData?.pages.map((page, index) => 
          page.id === _activePageId ? (
            <Page
              key={index}
              pageId={page.id}
              title={page.title}
              gridEnabled={page.gridEnabled}
              components={page.components}
              connections={page.connections}
            />
          ) : null)
      )}
    </>
  )
};

export default PageManager;