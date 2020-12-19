import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fire from './../../fire';
const BoardSettings = () => {
  const { boardId } = useParams();
  const history = useHistory();

  const deleteBoard = () => {
    if (window.confirm('Projekt wirklich löschen?')) {
      fire.database
        .ref(`boards/${boardId}`)
        .remove()
        .then(() => {
          history.push('/boards');
        });
    }
  };
  return <div>Hi</div>;
};

export default BoardSettings;
