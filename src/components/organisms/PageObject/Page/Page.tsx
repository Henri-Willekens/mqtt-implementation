import React from 'react';
import Draggable from '../../../atoms/Draggable/Draggable';
import { Grid } from '../../../atoms/Grid/Grid';
import DynamicRenderComponents from '../../DynamicRenderComponents/DynamicRenderComponents';
import PageProps from './Page.types';
import './Page.scss';

const Page: React.FC<PageProps> = ({ pageId, config }) => {
  return (
    <div className='Page'>
      <h2>Page {pageId}</h2>
      <Grid />
      {/* <DynamicRenderComponents config={config} theme="day" configMode={true} gridEnabled={true} /> */}
    </div>
  );
};

export default Page;
