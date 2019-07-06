import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
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

  createShippingMessage() {
    if (this.state.isPrime === 'false') {
      return(<span className="a-size-base a-color-base">& <b>Free Shipping</b></span>)
    } else {
      return(<span id="priceBadging_feature_div" className="feature">
        <i className="a-icon a-icon-prime">
          <span className="a-icon-alt"></span>
        </i>
        <span className="a-size-base a-color-base"></span>
      </span>)
    }
  }

  createArrivesMessage() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (this.state.isPrime === "true") {
      let d = new Date();
      let deliveryDate = days[d.getDay()+2];
      return(
        <div id="arrives-by-message" className="a-section a-spacing-none a-spacing-top-mini">
          FREE Delivery: <b className="a-text-bold">{deliveryDate} </b>
          <br/>
          <span className="a-color-secondary">Order within </span>
          <span id="ship-time-CTA" className="a-color-secondary">{this.getRemainingTimetoOrder()} </span>
          <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ftinfo_dp_?ie=UTF8&nodeId=3510241&pop-up=1" target="AmazonHelp">Details</a>
        </div>
      )
    } else {
      let earliest = moment().add(5, 'days').format("MMM DD");
      let latest = moment().add(10, 'days').format("MMM DD");
      let upsell = moment().add(2, 'days').format("MMM DD");
      return(
        <div className="a-section a-spacing-none">
          <div id="arrives-by-message" className="a-section a-spacing-none a-spacing-top-mini">
            Arrives: <span className="a-text-bold">{earliest} - {latest}</span>
          </div>
          <div id="upsell-shipping-message" className="a-section a-spacing-mini a-spacing-top-micro">
            Fastest delivery: <span className="a-text-bold">{upsell}</span>
          </div>
        </div>
        )
    }
  }

  getRemainingTimetoOrder() {
    let actualTime = new Date(Date.now());
    let endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
    let timeRemaining = endOfDay.getTime() - actualTime.getTime();
    let timeToOrder = timeRemaining;
    let hours = Math.floor(timeToOrder / 1000 / 60 / 60);
    let minutes = Math.floor((timeToOrder / 1000 / 60 / 60 - hours) * 60);
    return `${hours} hours and ${minutes} minutes`
  }

  componentDidMount() {
    $.ajax({
      url: `/api/${Math.floor(Math.random() * 100)}`,
      type: 'GET',
      success: (data) => {
        // console.log(data[0]);
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
/* form overall box structure */
    <div className="a-box-group">
      <div className="a-box a-last">
        <div className="a-box-inner">
          <div className="a-section a-spacing-none a-padding-none">
            {/* start small section that forms price block  */}
            <div idname="priceInsideBuyBox_feature_div">
              <div className="a-section">
                <span id="price_inside_buybox" className="a-size-medium a-color-price">
                  ${this.state.Price}
                </span>
              </div>
            </div>
            {/* form large box below price block (everything above Add To List) */}
            <div id="desktop_qualifiedBuyBox" className="feature">
              <div className="a-section a-spacing-none a-padding-none">
                <div id="invitePlatform_feature_div" className="feature">
                </div>
                <div id="pointsInsideBuyBox_feature_div" className="feature">
                </div>
                {/* form Prime / Free Shipping section */}
                <div id="shippingMessageInsideBuyBox_feature_div" className="feature">
                  <div className="a-section">
                    <div className="a-row">
                      <div className="a-column a-span12 a-text-left a-spacing-top-micro">
                        {this.createShippingMessage()}
                      </div>
                    </div>
                  </div>
                </div>
                {/* form shipping speed estimates section */}
                <div id="dpFastTrackInsideBuyBox_feature_div" className="feature">
                  <div className="a-section a-spacing-mini a-spacing-top-micro">
                    <div className="a-row">
                      <div className="a-column a-span12 a-text-left">
                        {/* form "Arrives" + "Fastest Delivery" section */}
                        <div id="fast-track" className="a-section a-spacing-none">
                            {this.createArrivesMessage()}
                        </div>
                        {/* form "Deliver to___" with location icon section */}
                        <div id="customer-location-badge" className="a-declarative">
                          {/* INSERT CODE FOR CUSTOMER ICON/LOCATION HERE */}
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>
                <div id="" className="">
                </div>
                <div id="" className="">
                </div>
                <div id="" className="">
                </div>
                <div id="" className="">
                </div>
                <div id="" className="">
                </div>
                <div id="" className="">
                </div>
              </div>
            </div>
            <div id="digitalDashHighProminence_feature_div" className="feature">
            </div>
            <div id="addToWishlist_feature_div" className="feature">
            </div>
            <div id="digitalDashLowProminence_feature_div" className="feature">
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));