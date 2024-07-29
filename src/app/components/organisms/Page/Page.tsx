import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

import './Page.scss'
import PageProps from './Page.types';

const Page: React.FC<PageProps> = ({ pageId, title, components, activePageId }) => {
  return (
    <div key={pageId}>
      <p>Page: {title}</p>
      <DynamicRenderComponents gridEnabled={false} config={components} activePageId={pageId} />
    </div>
  )
};

export default Page;