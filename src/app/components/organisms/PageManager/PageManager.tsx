import './PageManager.scss';
import PageManagerProps from './PageManager.types';

import Page from '../Page/Page';
import AlertLog from '../StaticPages/AlertLog/AlertLog';
import SettingsPage from '../StaticPages/Settings/Settings';
import PagesOverview from '../StaticPages/PagesOverview/PagesOverview';

const PageManager: React.FC<PageManagerProps> = ({ config, activePageId }) => {

  const STATIC_PAGES: { [key: string]: React.FC } = {
    Settings: SettingsPage,
    PagesOverview: PagesOverview,
    AlertLog: AlertLog
  };

  const StaticPageComponent = STATIC_PAGES[activePageId];

  return (
    <>
      {StaticPageComponent ? (
        <StaticPageComponent />
      ) : (
        config.pages.map((_page) =>
          _page.id === activePageId ? (
            <Page
              key={_page.id}
              pageId={_page.id}
              title={_page.title}
              gridEnabled={_page.gridEnabled}
              components={_page.components}
              activePageId={activePageId}
            />
          ) : null
        )
      )}
    </>
  );
};

export default PageManager;