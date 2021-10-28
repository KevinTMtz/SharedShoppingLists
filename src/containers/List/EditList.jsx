import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import ListForm from '../../components/List/ListForm';

const EditList = () => {
  const history = useHistory();

  const { listId } = useParams();

  const [listName, setListName] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then((result) => {
        setListName(result.data.listName);
      })
      .catch((error) => console.log(error));
  }, [listId]);

  const editList = async () => {
    await axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then(async (result) => {
        const newListData = {
          ...result.data,
          listName: listName,
        };

        await axios
          .put(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
            {
              ...newListData,
            },
          )
          .then((response) => {
            history.push(`/list/${listId}`);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteList = async () => {
    await axios
      .delete(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then(() => {
        console.log('Delete list successful');

        history.push({
          pathname: '/',
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Edit List</h1>
      <ListForm
        listName={listName}
        setListName={setListName}
        isCreating={false}
        onSubmit={editList}
        onDelete={deleteList}
      />
    </div>
  );
};

export default EditList;
