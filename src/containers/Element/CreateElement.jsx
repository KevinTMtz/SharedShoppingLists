import React from 'react';
import ElementForm from '../../components/Element/ElementForm';

const CreateElement = () => {
  const createElement = async () => {};

  return (
    <div>
      <h1>Create Element</h1>
      <ElementForm isCreating={true} onSubmit={createElement} />
    </div>
  );
};

export default CreateElement;
