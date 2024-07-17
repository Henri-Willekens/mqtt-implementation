import React from 'react';
import { Grid } from '../Grid';
import Draggable from '../Draggable';

const Page = ({ pageId, elements, updateElementPosition }) => {
  return (
    <div>
      <h2>Page {pageId}</h2>
      <Grid />
      {elements.map((element, index) => (
        <Draggable
          key={index}
          index={index}
          position={element}
          updatePosition={(position) =>
            updateElementPosition(pageId, index, position)
          }
        />
      ))}
    </div>
  );
};

export default Page;
