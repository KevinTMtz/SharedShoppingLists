import React from 'react';
import { useHistory, useParams } from 'react-router';

import Button from './Button';
import ButtonsDiv from './ButtonsDiv';

const ListForm = (props) => {
  const history = useHistory();

  const { listId } = useParams();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await props.onSubmit();
      }}
    >
      <input placeholder='List name' required />
      <ButtonsDiv>
        <Button type='submit'>
          {props.isCreating ? 'Create' : 'Update'} list
        </Button>
        {props.isCreating ? (
          <Button type='secondary' onClick={() => history.push('/')}>
            Return home
          </Button>
        ) : (
          <Button
            type='secondary'
            onClick={() => history.push(`/list/${listId}`)}
          >
            Return to list
          </Button>
        )}
      </ButtonsDiv>
    </form>
  );
};

export default ListForm;
