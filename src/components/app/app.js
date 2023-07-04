import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList,
} from '../sw-components';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    hasError: false,
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return { swapiService: new Service() };
    });
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />
            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
