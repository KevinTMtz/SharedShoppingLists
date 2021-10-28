import React from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../Button/Button';
import ButtonsDiv from '../Button/ButtonsDiv';

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
      <input
        placeholder={props.inputPlaceHolder ?? 'List name'}
        required
        value={props.listName}
        onChange={(event) => props.setListName(event.target.value)}
      />
      <ButtonsDiv>
        <Button type='submit'>
          {props.isCreating
            ? props.inputPlaceHolder
              ? 'Add list'
              : 'Create list'
            : 'Update list name'}
        </Button>
        {props.isCreating ? (
          <Button className='secondary' onClick={() => history.push('/')}>
            Return home
          </Button>
        ) : (
          <>
            <Button
              className='danger'
              onClick={async (event) => {
                event.preventDefault();
                await props.onDelete();
              }}
            >
              Delete list
            </Button>
            <Button
              className='secondary'
              onClick={() => history.push(`/list/${listId}`)}
            >
              Return to list
            </Button>
          </>
        )}
      </ButtonsDiv>
    </form>
  );
};

export default ListForm;
