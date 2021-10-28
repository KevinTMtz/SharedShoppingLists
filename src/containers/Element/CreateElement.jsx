import React, { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import ElementForm from '../../components/Element/ElementForm';

const CreateElement = () => {
  const { listId } = useParams();

  const [element, setElement] = useState({
    elementName: '',
    elementAmount: '',
    checked: false,
  });

  const createElement = async () => {
    await axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then(async (result) => {
        const newListData = {
          ...result.data,
          list: [...(result.data.list ?? []), element],
        };

        await axios
          .put(
            `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
            {
              ...newListData,
            },
          )
          .then((response) => {
            console.log('Create element successful');
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Create Item</h1>
      <ElementForm
        element={element}
        setElement={setElement}
        isCreating={true}
        onSubmit={createElement}
      />
    </div>
  );
};

export default CreateElement;
