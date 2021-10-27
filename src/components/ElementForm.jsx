import React from 'react';
import { useHistory, useParams } from 'react-router';

import Button from './Button';
import ButtonsDiv from './ButtonsDiv';

const ElementForm = (props) => {
  const history = useHistory();

  const { listId } = useParams();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await props.onSubmit();

        history.push({
          pathname: '/',
        });
      }}
    >
      <input placeholder='List name' required />
      <input placeholder='List name' type='number' required />
      <ButtonsDiv>
        <Button type='submit'>
          {props.isCreating ? 'Create' : 'Update'} element
        </Button>
        <Button
          type='secondary'
          onClick={() => history.push(`/list/${listId}`)}
        >
          Cancel {props.isCreating ? 'create' : 'update'} element
        </Button>
      </ButtonsDiv>
    </form>
  );
};

export default ElementForm;
