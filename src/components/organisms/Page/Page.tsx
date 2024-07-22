import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';

import './Page.scss'
import PageProps from './Page.types';

const Page: React.FC<PageProps> = ({key, title, components}) => {
  return (
    <div key={key}>
      <p>Page: {title}</p>
      <DynamicRenderComponents theme={"day"} configMode={false} gridEnabled={false} config={components} />
    </div>
  )
};

export default Page;