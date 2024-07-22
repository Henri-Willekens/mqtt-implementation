import Page from "../Page/Page";

import "./PageManager.scss";
import PageManagerProps from "./PageManager.types";

const PageManager: React.FC<PageManagerProps> = ({ config, activePageId }) => {
  return(
    <>
      {config.pages.map((_page) => 
        _page.id === activePageId ? (
        <Page 
          key={_page.id} 
          pageId={_page.id} 
          title={_page.title} 
          components={_page.components}
        />
      ) : null
      )}
    </>
  );
};

export default PageManager;