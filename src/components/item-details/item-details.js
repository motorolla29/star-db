import React, { Component } from 'react';
import './item-details.css';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    loading: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl
    ) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      this.setState({ item: null, loading: false });
      return;
    }

    getData(itemId).then((item) => {
      this.setState({ item, image: getImageUrl(item), loading: false });
    });
  }

  render() {
    const { item, image, loading } = this.state;
    const { select } = this.props;
    if (!item && select && loading) {
      return <Spinner />;
    }
    if (!item && select) {
      return <h4>Select a item</h4>;
    }
    if (!item && !select) {
      return <Spinner />;
    }
    const { name } = item;
    return loading ? (
      <Spinner />
    ) : (
      <div className="person-details card">
        <img className="person-image" src={image} alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
