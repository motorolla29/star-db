import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from '../sw-components';
export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return { swapiService: new Service() };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Routes>
                <Route
                  path="/"
                  element={
                    <h3 className="welcome-caption">Welcome to StarDB</h3>
                  }
                  exact
                />

                <Route path="/people" element={<PeoplePage />} exact />
                <Route path="/planets" element={<PlanetsPage />} exact />
                <Route path="/starships" element={<StarshipsPage />} exact />
                <Route path="/people/:id" element={<PersonDetails />} />
                <Route path="/planets/:id" element={<PlanetDetails />} />
                <Route path="/starships/:id" element={<StarshipDetails />} />
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
