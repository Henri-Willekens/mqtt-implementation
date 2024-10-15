import './Page.scss'
import PageProps from './Page.types';

import { Grid } from '../../atoms/Grid/Grid';
import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

const Page: React.FC<PageProps> = ({ 
  pageId,
  title, 
  components, 
  connections, 
  gridEnabled 
}) => {
  return (
    <div className='page'>
      <p className='page__title'>Active page: {title}</p>
      {gridEnabled && <Grid /> }
      <DynamicRenderComponents 
        gridEnabled={gridEnabled} 
        components={components} 
        connections={connections} 
      />
    </div>
  )
};

export default Page;