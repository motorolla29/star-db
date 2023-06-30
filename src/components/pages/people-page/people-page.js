import React, { Component } from 'react';
import ItemList from '../../item-list/item-list';
import ItemDetails from '../../item-details/item-details';
import ErrorBoundry from '../../error-boundry/error-boundry';
import SwapiService from '../../../services/swapi-service';
import Row from '../../row';
import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    selectedPerson: null,
  };

  swapiService = new SwapiService();

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(i) => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return <Row left={itemList} rigth={personDetails} />;
  }
}
