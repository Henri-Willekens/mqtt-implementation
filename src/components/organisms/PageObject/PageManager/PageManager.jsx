import React, { useState } from 'react';
import Page from '../Page/Page';
import './PageManager.scss';

const PageManager = ({config}) => {
  const [pages, setPages] = useState([{ id: 1, elements: [{ x: 0, y: 0 }] }]);
  const [currentPage, setCurrentPage] = useState(1);

  const addPage = () => {
    const newPageId = pages.length + 1;
    setPages([...pages, { id: newPageId, elements: [{ x: 0, y: 0 }] }]);
    setCurrentPage(newPageId);
  };

  const updateElementPosition = (pageId, index, position) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              elements: page.elements.map((element, i) =>
                i === index ? position : element
              )
            }
          : page
      )
    );
  };

  return (
    <div className='PageManager'>
      <button onClick={addPage}>Add New Page</button>
      {pages.map((page) =>
        page.id === currentPage ? (
          <Page
            key={page.id}
            config={config}
            pageId={page.id}
            elements={page.elements}
            updateElementPosition={updateElementPosition}
          />
        ) : null
      )}
      <div>
        {pages.map((page) => (
          <button key={page.id} onClick={() => setCurrentPage(page.id)}>
            Go to Page {page.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageManager;
