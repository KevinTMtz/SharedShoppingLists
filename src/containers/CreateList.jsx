import React from 'react';
import { useHistory } from 'react-router';

import ListForm from '../components/ListForm';

const CreateList = () => {
  const history = useHistory();

  const createList = async () => {
    history.push({
      pathname: '/',
    });
  };

  return (
    <div>
      <h1>Create List</h1>
      <ListForm isCreating={true} onSubmit={createList} />
    </div>
  );
};

export default CreateList;
