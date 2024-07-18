import { useState } from "react";
import Page from "../Page/Page";

import "./PageManager.scss";
import PageManagerProps from "./PageManager.types";

const PageManager: React.FC<PageManagerProps> = ({ config }) => {
  const [_currentPage, setCurrentPage] = useState(1);

  return(
    <>
      {config.pages.map((_page) => 
        _page.id === _currentPage ? (
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