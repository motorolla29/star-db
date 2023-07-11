import React from 'react';
import { PlanetList } from '../sw-components';
import { withRouter } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PlanetsPage = () => {
  const history = useNavigate();

  return <PlanetList onItemSelected={(itemId) => history(itemId)} />;
};
export default withRouter(PlanetsPage);
