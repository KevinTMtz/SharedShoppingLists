import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';

import Button from '../../components/Button/Button';
import ButtonsDiv from '../../components/Button/ButtonsDiv';
import ListCell from '../../components/List/ListCell';

const SharedLists = () => {
  const history = useHistory();

  const auth = getAuth();

  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists([
      { id: '1', listName: 'UwU' },
      { id: '2', listName: 'AwA' },
      { id: '3', listName: 'OwO' },
    ]);
  }, []);

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
        {lists.map((listElement, index) => {
          return (
            <ListCell
              key={`list-element-${listElement.text}-${index}`}
              onClick={() => goToList(listElement.id)}
            >
              {listElement.listName}
            </ListCell>
          );
        })}
      </div>
    </div>
  );
};

export default SharedLists;
