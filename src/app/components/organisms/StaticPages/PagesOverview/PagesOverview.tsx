import PagesOverviewProps from './PagesOverview.types';
import './PagesOverview.scss';

const PagesOverview: React.FC<PagesOverviewProps> = ({ pages }) => {
  console.log(pages);

  return (
    <div className='pages-overview'>
      <h2>All pages</h2>
    </div>
  );
};

export default PagesOverview;