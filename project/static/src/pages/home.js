import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '../components/ui/buttons';


@inject('store') @observer
export default class Home extends React.Component {
  render() {
    const { store, uiStore } = this.props;
    console.log('Home products: ', store.products);
    // const params = new URL(window.location.href).searchParams;
    // if (params.get('token')) {
    //   console.log('location params: ', params.get('token'));
    //   window.localStorage.setItem('token', params.get('token'));
    // }
    return <div>
      <button className="btn btn-primary btn-rounded" onClick={store.getProducts}>get products</button>
      <Button />
      {store.products &&
        store.products.map((p, i) => <div className="col-md-4" key={i}>{p.name} <br/>{p.description}</div>)
      }
    </div>;
  }
}

// Home.propTypes = {
//   getProducts: React.PropTypes.func,
//   products: React.PropTypes.array,
// };
