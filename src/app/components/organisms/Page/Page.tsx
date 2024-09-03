import { Grid } from '../../atoms/Grid/Grid';
import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

import './Page.scss'
import PageProps from './Page.types';

const Page: React.FC<PageProps> = ({ pageId, title, config, activePageId, gridEnabled }) => {
  return (
    <div key={pageId} className="page">
      {gridEnabled && <Grid /> }
      <DynamicRenderComponents 
        gridEnabled={gridEnabled} 
        components={config.components} 
        connections={config.connections} 
        activePageId={activePageId} 
      />
    </div>
  )
};

export default Page;