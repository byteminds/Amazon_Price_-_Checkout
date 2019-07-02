import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../dist/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Price: null,
      isPrime: null,
      stockQty: null,
      shipCost: null,
      soldBy: null,
      subscriptionProtectionPlanCost: null,
      TwoYrProtectionPlanCost: null
    };
  };

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
      <div className="a-box a-last">
        <div className="a-box-inner">
          <div className="a-section a-spacing-none a-padding-none">
            <span>{this.state.Price}</span>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));