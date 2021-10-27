import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { getAuth } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import ListForm from '../../components/List/ListForm';

const CreateList = () => {
  const history = useHistory();

  const [user] = useAuthState(getAuth());

  const [listName, setListName] = useState('');
  const [listId, setListId] = useState('');

  const createList = async () => {
    await axios
      .post('https://sharedlist-d718d-default-rtdb.firebaseio.com/lists.json', {
        listName: listName,
        list: [],
      })
      .then((response) => {
        axios
          .get(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
          )
          .then((usersListsData) => {
            axios
              .put(
                `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
                {
                  lists: [
                    ...(usersListsData.data?.lists ?? []),
                    response.data.name,
                  ],
                },
              )
              .then((response) => {
                history.push({
                  pathname: '/',
                });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const addList = async () => {
    await axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
      )
      .then((usersListsData) => {
        axios
          .put(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
            {
              lists: [...(usersListsData.data?.lists ?? []), listId],
            },
          )
          .then((response) => {
            history.push({
              pathname: '/',
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Create List</h1>
      <ListForm
        listName={listName}
        setListName={setListName}
        isCreating={true}
        onSubmit={createList}
      />
      <h3 style={{ textAlign: 'center' }}>- or -</h3>
      <h1>Add existing list</h1>
      <ListForm
        listName={listId}
        setListName={setListId}
        isCreating={true}
        onSubmit={addList}
        inputPlaceHolder='Shared list ID'
      />
    </div>
  );
};

export default CreateList;
