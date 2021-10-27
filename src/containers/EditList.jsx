import React from 'react';
import { useHistory, useParams } from 'react-router';

import ListForm from '../components/ListForm';

const EditList = () => {
  const history = useHistory();

  const { listId } = useParams();

  const editList = async () => {
    history.push({
      pathname: `/list/${listId}`,
    });
  };

  return (
    <div>
      <h1>Edit List</h1>
      <ListForm isCreating={false} onSubmit={editList} />
    </div>
  );
};

export default EditList;
