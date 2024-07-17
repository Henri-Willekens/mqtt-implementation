import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Page from './Page';

const App = () => {
  const [pages, setPages] = React.useState([{ id: 1 }]);

  const addPage = () => {
    const newPageId = pages.length + 1;
    setPages([...pages, { id: newPageId }]);
  };

  return (
    <Router>
      <div>
        <button onClick={addPage}>Add New Page</button>
        <nav>
          {pages.map((page) => (
            <Link key={page.id} to={`/page/${page.id}`}>
              Page {page.id}
            </Link>
          ))}
        </nav>
        <Switch>
          {pages.map((page) => (
            <Route key={page.id} path={`/page/:id`} render={(props) => <Page pageId={page.id} />} />
          ))}
          <Route path="/" exact>
            <h1>Welcome to the Multi-Page Grid Application</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
