import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';

import Button from '../../components/Button/Button';
import ButtonsDiv from '../../components/Button/ButtonsDiv';
import ListCell from '../../components/List/ListCell';
import axios from 'axios';

const SharedLists = () => {
  const history = useHistory();

  const auth = getAuth();

  const [lists, setLists] = useState({ listID: { listName: 'List Name' } });

  useEffect(
    () =>
      axios
        .get('https://sharedlist-d718d-default-rtdb.firebaseio.com/lists.json')
        .then((result) => {
          setLists(result.data);
        })
        .catch((error) => console.log(error)),
    [],
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
      <h1>Shared Lists</h1>
      <ButtonsDiv>
        <Button onClick={() => history.push('/create-list')}>
          Create list
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
              {lists[listElement].listName}
            </ListCell>
          );
        })}
      </div>
    </div>
  );
};

export default SharedLists;
