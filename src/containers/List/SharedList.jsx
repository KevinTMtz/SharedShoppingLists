import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../../components/Button/Button';
import ButtonsDiv from '../../components/Button/ButtonsDiv';
import ListCell from '../../components/List/ListCell';

const SharedList = () => {
  const history = useHistory();

  const [listData, setListData] = useState({ listName: '', list: [] });

  const { listId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://sharedlist-d718d-default-rtdb.firebaseio.com/lists/${listId}.json`,
      )
      .then((result) => {
        setListData({ ...result.data, list: result.data.list ?? [] });
      })
      .catch((error) => console.log(error));
  }, [listId]);

  const goToElement = (elementId) => {
    history.push(`/list/${listId}/element/${elementId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(listId);
  };

  return (
    <div>
      <h1>List - {listData.listName}</h1>
      <p
        className='list-id'
        onClick={copyToClipboard}
        style={{ lineHeight: '1.25' }}
      >
        Click to copy share ID
        <br />
        <strong>{listId}</strong>
      </p>
      <ButtonsDiv>
        <Button
          className='primary'
          onClick={() => history.push(`/edit-list/${listId}`)}
        >
          Edit list
        </Button>
        <Button onClick={() => history.push(`/list/${listId}/create-element`)}>
          Create element
        </Button>
        <Button className='secondary' onClick={() => history.push('/')}>
          Return home
        </Button>
      </ButtonsDiv>
      <div className='list'>
        {listData.list.map((listElement, index) => (
          <ListCell
            key={`list-element-${listElement.elementName}-${index}`}
            onClick={() => goToElement(index)}
          >
            {listElement.elementName} - Amount: {listElement.elementAmount}
          </ListCell>
        ))}
      </div>
    </div>
  );
};

export default SharedList;
