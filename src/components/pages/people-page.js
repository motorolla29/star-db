import React from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import { withRouter } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import Row from '../row';

const PeoplePage = () => {
  const history = useNavigate();
  const { id } = useParams();

  return (
    <Row
      left={
        <PersonList onItemSelected={(itemId) => history(`/people/${itemId}`)} />
      }
      right={<PersonDetails itemId={id} />}
    />
  );
};

export default withRouter(PeoplePage);
