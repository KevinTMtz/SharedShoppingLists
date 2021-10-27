import React from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../Button/Button';
import ButtonsDiv from '../Button/ButtonsDiv';

const ElementForm = (props) => {
  const history = useHistory();

  const { listId } = useParams();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await props.onSubmit();

        history.push(`/list/${listId}`);
      }}
    >
      <input
        placeholder='Item name'
        required
        value={props.element.elementName}
        onChange={(event) =>
          props.setElement({
            ...props.element,
            elementName: event.target.value,
          })
        }
      />
      <input
        placeholder='Amount'
        required
        value={props.element.elementAmount}
        onChange={(event) =>
          props.setElement({
            ...props.element,
            elementAmount: event.target.value,
          })
        }
      />
      <ButtonsDiv>
        <Button type='submit'>
          {props.isCreating ? 'Create' : 'Update'} item
        </Button>
        {!props.isCreating && (
          <Button
            className='danger'
            onClick={(event) => {
              event.preventDefault();
              props.onDelete();
            }}
          >
            Delete element
          </Button>
        )}
        <Button
          className='secondary'
          onClick={() => history.push(`/list/${listId}`)}
        >
          Cancel {props.isCreating ? 'create' : 'update'} item
        </Button>
      </ButtonsDiv>
    </form>
  );
};

export default ElementForm;
