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

  const createList = async () => {
    axios
      .post('https://sharedlist-d718d-default-rtdb.firebaseio.com/lists.json', {
        listName: listName,
        list: [],
      })
      .then((response) => {
        axios
          .post(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/usersLists/${user.uid}.json`,
            {
              lists: [response.data.name],
            },
          )
          .then((response) => {
            console.log(response.data.name);

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
    </div>
  );
};

export default CreateList;
