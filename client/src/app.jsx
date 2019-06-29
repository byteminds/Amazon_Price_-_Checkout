import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import '../dist/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Price: '',
      isPrime: '',
      stockQty: '',
      shipCost: '',
      soldBy: '',
      subscriptionProtectionPlanCost: '',
      TwoYrProtectionPlanCost: ''
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/${Math.floor(Math.random() * 100)}`,
      type: 'GET',
      success: (data) => {
        this.setState({
        Price: data[0].Price,
        isPrime: data[0].isPrime,
        stockQty: data[0].stockQty,
        shipCost: data[0].shipCost,
        soldBy: data[0].soldBy,
        subscriptionProtectionPlanCost: data[0].subscriptionProtectionPlanCost,
        TwoYrProtectionPlanCost: data[0].TwoYrProtectionPlanCost
      })
      }
    })
  };

  render() {
    return(
    <div className="a-box-group">
    <h3>{this.state.Price}</h3>
    </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));