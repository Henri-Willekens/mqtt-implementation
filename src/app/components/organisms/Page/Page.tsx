import './Page.scss'
import PageProps from './Page.types';

import { Grid } from '../../atoms/Grid/Grid';
import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

const Page: React.FC<PageProps> = ({ pageId, title, components, activePageId, gridEnabled }) => {
  return (
    <div key={pageId} className='page'>
      {gridEnabled && <Grid /> }
      <DynamicRenderComponents gridEnabled={gridEnabled} config={components} activePageId={activePageId} />
    </div>
  )
};

export default Page;