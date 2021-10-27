import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Button/Button';
import ButtonsDiv from '../../components/Button/ButtonsDiv';
import ListCell from '../../components/List/ListCell';

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(listId);
  };

  return (
    <div>
      <h1>{'List'}</h1>
      <h1>{list.listName}</h1>
      <p className='list-id' onClick={copyToClipboard}>
        Click to copy ID
        <br />
        {listId}
      </p>
      <ButtonsDiv>
        <Button
          type='primary'
          onClick={() => history.push(`/edit-list/${listId}`)}
        >
          Edit list
        </Button>
        <Button onClick={() => history.push(`/list/${listId}/create-element`)}>
          Create element
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
