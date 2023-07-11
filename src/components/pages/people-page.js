import React from 'react';
import { PersonList } from '../sw-components';
import { withRouter } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PeoplePage = () => {
  const history = useNavigate();

  return <PersonList onItemSelected={(itemId) => history(itemId)} />;
};

export default withRouter(PeoplePage);
