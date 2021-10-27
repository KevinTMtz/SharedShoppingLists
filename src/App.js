import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { getAuth } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import SharedLists from './containers/List/SharedLists';
import SharedList from './containers/List/SharedList';
import CreateList from './containers/List/CreateList';
import EditList from './containers/List/EditList';
import EditElement from './containers/Element/EditElement';
import CreateElement from './containers/Element/CreateElement';
import Auth from './containers/Auth/Auth';

const App = () => {
  const [user] = useAuthState(getAuth());

  return (
    <div className='App'>
      {user ? <Redirect to='/' /> : <Redirect to='/auth' />}
      {!user ? (
        <Switch>
          <Route path='/auth' exact>
            <Auth />
          </Route>
        </Switch>
      ) : (
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
      )}
    </div>
  );
};

export default App;
