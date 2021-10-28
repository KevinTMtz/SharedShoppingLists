import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

import ElementForm from '../../components/Element/ElementForm';

const EditElement = () => {
  const history = useHistory();

  const { listId, elementId } = useParams();

  const [element, setElement] = useState({
    elementName: '',
    elementAmount: '',
  });

  useEffect(() => {
    axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then((result) => {
        setElement(result.data.list[elementId]);
      })
      .catch((error) => console.log(error));
  }, [listId, elementId]);

  const editElement = async () => {
    await axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then(async (result) => {
        const newListData = {
          ...result.data,
          list: [...(result.data.list ?? [])],
        };

        newListData.list[elementId] = element;

        await axios
          .put(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
            {
              ...newListData,
            },
          )
          .then((response) => {
            console.log('Update element successful');
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteElement = async () => {
    await axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then(async (result) => {
        const newListData = {
          ...result.data,
          list: [...(result.data.list ?? [])],
        };

        newListData.list.splice(elementId, 1);

        await axios
          .put(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
            {
              ...newListData,
            },
          )
          .then((response) => {
            console.log('Delete element successful');
            history.push(`/list/${listId}`);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <ElementForm
        isCreating={false}
        onSubmit={editElement}
        element={element}
        setElement={setElement}
        onDelete={deleteElement}
      />
    </div>
  );
};

export default EditElement;
