import Page from "../Page/Page";
import SettingsPage from "../StaticPages/Settings/Settings";

import "./PageManager.scss";
import PageManagerProps from "./PageManager.types";


const PageManager: React.FC<PageManagerProps> = ({ config, activePageId }) => {

  const STATIC_PAGES: { [key: string]: React.FC } = {
    Settings: SettingsPage
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
              config={_page}
              activePageId={activePageId}
            />
          ) : null
        )
      )}
    </>
  );
};

export default PageManager;