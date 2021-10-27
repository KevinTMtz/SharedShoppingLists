import React from 'react';
import { Route, Switch } from 'react-router';

import SharedLists from './containers/SharedLists';
import SharedList from './containers/SharedList';
import CreateList from './containers/CreateList';
import EditElement from './containers/EditElement';
import CreateElement from './containers/CreateElement';
import EditList from './containers/EditList';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          <SharedLists />
        </Route>
        <Route path='/list/:listId' exact>
          <SharedList />
        </Route>
        <Route path='/create-list' exact>
          <CreateList />
        </Route>
        <Route path='/edit-list/:listId' exact>
          <EditList />
        </Route>
        <Route path='/list/:listId/create-element' exact>
          <CreateElement />
        </Route>
        <Route path='/list/:listId/element/:elementId' exact>
          <EditElement />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
