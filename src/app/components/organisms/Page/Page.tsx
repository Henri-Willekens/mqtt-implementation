import './Page.scss'
import PageProps from './Page.types';

import { useContext } from 'react';

import { Grid } from '../../atoms/Grid/Grid';
import DynamicRenderComponents from '../DynamicRenderComponents/DynamicRenderComponents';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';

const Page: React.FC<PageProps> = ({ 
  pageId,
  title, 
  components, 
  connections, 
  gridEnabled 
}) => {

  const { _currentTheme } = useContext(CurrentThemeContext)

  return (
    <div className='page'>
      <p className={`page__title page__title__${_currentTheme}`}>Active page: {title}</p>
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