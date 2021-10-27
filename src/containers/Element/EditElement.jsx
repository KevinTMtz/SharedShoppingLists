import React from 'react';
import ElementForm from '../../components/Element/ElementForm';

const EditElement = () => {
  const editElement = async () => {};

  return (
    <div>
      <h1>Edit Element</h1>
      <ElementForm isCreating={false} onSubmit={editElement} />
    </div>
  );
};

export default EditElement;
