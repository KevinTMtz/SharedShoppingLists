import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../components/Button';
import ButtonsDiv from '../components/ButtonsDiv';
import ListCell from '../components/ListCell';

const SharedList = () => {
  const history = useHistory();

  const [list, setList] = useState([]);

  const { listId } = useParams();

  useEffect(() => {
    setList([
      { id: '1', title: 'Element 1' },
      { id: '2', title: 'Element 2' },
      { id: '3', title: 'Element 3' },
    ]);
  }, []);

  const goToElement = (elementId) => {
    history.push(`/list/${listId}/element/${elementId}`);
  };

  return (
    <div>
      <h1>{list.listName ?? 'List'}</h1>
      <ButtonsDiv>
        <Button onClick={() => history.push(`/list/${listId}/create-element`)}>
          Create element
        </Button>
        <Button
          type='primary'
          onClick={() => history.push(`/edit-list/${listId}`)}
        >
          Edit list
        </Button>
        <Button type='secondary' onClick={() => history.push('/')}>
          Return home
        </Button>
      </ButtonsDiv>
      <div className='list'>
        {list.map((listElement, index) => (
          <ListCell
            key={`list-element-${listElement.title}-${index}`}
            onClick={() => goToElement(listElement.id)}
          >
            {listElement.title}
          </ListCell>
        ))}
      </div>
    </div>
  );
};

export default SharedList;
