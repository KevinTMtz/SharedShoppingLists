import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';

import ListForm from '../../components/List/ListForm';

const EditList = () => {
  const history = useHistory();

  const { listId } = useParams();

  const [listName, setListName] = useState('');

  const editList = async () => {
    history.push({
      pathname: `/list/${listId}`,
    });
  };

  return (
    <div>
      <h1>Edit List</h1>
      <ListForm
        listName={listName}
        setListName={setListName}
        isCreating={false}
        onSubmit={editList}
      />
    </div>
  );
};

export default EditList;
