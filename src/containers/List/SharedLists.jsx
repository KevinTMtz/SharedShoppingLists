import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '../../components/Button/Button';
import ButtonsDiv from '../../components/Button/ButtonsDiv';
import ListCell from '../../components/List/ListCell';

const SharedLists = () => {
  const history = useHistory();

  const auth = getAuth();
  const [user] = useAuthState(auth);

  const [lists, setLists] = useState({
    listID: { listName: 'List Name', list: [] },
  });

  useEffect(
    () =>
      axios
        .get(
          `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
        )
        .then((usersListsData) => {
          axios
            .get(
              'https://sharedlist-d718d-default-rtdb.firebaseio.com/lists.json',
            )
            .then((result) => {
              const userLists = {};
              Object.keys(result.data).forEach((listId) => {
                if (
                  usersListsData.data.lists.indexOf(listId) > -1 &&
                  Object.keys(userLists).indexOf(listId) === -1
                ) {
                  userLists[listId] = result.data[listId];
                }
              });

              setLists(userLists);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error)),
    [user.uid],
  );

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log('Sign out successful');
      })
      .catch((error) => {
        console.log('Could not sign out');
      });
  };

  const goToList = (listId) => {
    history.push(`/list/${listId}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Shopping Lists</h1>
      <h4 style={{ textAlign: 'center' }}>{user.email}</h4>
      <ButtonsDiv>
        <Button onClick={() => history.push('/create-list')}>
          Create or Add list
        </Button>
        <Button className='danger' onClick={logout}>
          Sing out
        </Button>
      </ButtonsDiv>
      <div className='list'>
        {Object.keys(lists ?? {}).map((listElement, index) => {
          return (
            <ListCell
              key={`list-element-${lists[listElement].listName}-${index}`}
              onClick={() => goToList(listElement)}
            >
              {lists[listElement].listName} - Items:{' '}
              {lists[listElement].list?.length ?? 0}
            </ListCell>
          );
        })}
      </div>
    </div>
  );
};

export default SharedLists;
