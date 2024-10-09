import './Page.scss'
import PageProps from './Page.types';

import { Grid } from '../../atoms/Grid/Grid';
import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

const Page: React.FC<PageProps> = ({ 
  pageId,
  title, 
  components, 
  connections, 
  activePageId, 
  gridEnabled 
}) => {
  return (
    <div key={pageId} className='page'>
      {gridEnabled && <Grid /> }
      <DynamicRenderComponents 
        gridEnabled={gridEnabled} 
        components={components} 
        connections={connections} 
        activePageId={activePageId} 
      />
    </div>
  )
};

export default Page;