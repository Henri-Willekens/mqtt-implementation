import './PageManager.scss';
import PageManagerProps from './PageManager.types';

import { useContext } from 'react';

import Page from '../Page/Page';
import AlertLog from '../StaticPages/AlertLog/AlertLog';
import SettingsPage from '../StaticPages/Settings/Settings';
import PagesOverview from '../StaticPages/PagesOverview/PagesOverview';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const PageManager: React.FC<PageManagerProps> = ({ 
  activePageId 
}) => {
  const { _configData } = useContext(ConfigDataContext);

  const STATIC_PAGES: {
    [key: string]: {
      component: React.FC<any>,
      props?: Record<string, any>
    }
  } = {
    Settings: {
      component: SettingsPage
    },
    PagesOverview: {
      component: PagesOverview,
      props: {
        pages: _configData?.pages
      }
    },
    AlertLog: {
      component: AlertLog
    }
  };

  const _staticPage = STATIC_PAGES[activePageId];

  return (
    <>
      {_staticPage ? (
        <_staticPage.component {..._staticPage.props} />
      ) : (
        _configData?.pages.map((_page, _index) =>
          _page.id === activePageId ? (
            <Page
              key={_page.id}
              pageId={_page.id}
              title={_page.title}
              gridEnabled={_page.gridEnabled}
              components={_page.components}
              connections={_page.connections}
              activePageId={activePageId}
            />
          ) : null
        )
      )}
    </>
  );
};

export default PageManager;