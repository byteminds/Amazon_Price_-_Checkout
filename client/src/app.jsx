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

  formShippingMessage() {
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

  formArrivesMessage() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
    if (this.state.isPrime === "true") {
      let d = new Date();
      let deliveryDate = days[d.getDay()+2];
      return(
        <div id="arrives-by-message" className="a-section a-spacing-none a-spacing-top-mini">
          FREE Delivery: <b className="a-text-bold">{deliveryDate} </b>
          <a href="/gp/help/customer/display.html/ref=ftinfo_dp_?ie=UTF8&nodeId=3510241&pop-up=1" target="AmazonHelp">Details</a>
        </div>
      )
    } else {
        return(
          <div id="arrives-by-message" className="a-section a-spacing-none a-spacing-top-mini">
            Arrives: <span></span>
          </div>
        )
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/${Math.floor(Math.random() * 100)}`,
      type: 'GET',
      success: (data) => {
        console.log(data[0]);
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
                        {this.formShippingMessage()}
                      </div>
                    </div>
                  </div>
                </div>
                {/* form Prime or Free Shipping portion */}
                <div id="dpFastTrackInsideBuyBox_feature_div" className="feature">
                  <div className="a-section a-spacing-mini a-spacing-top-micro">
                    <div className="a-row">
                      <div className="a-column a-span12 a-text-left">
                        {/* form "Arrives" + "Fastest Delivery" section */}
                        <div id="fast-track" className="a-section a-spacing-none">
                            {this.formArrivesMessage()}
                        </div>
                        {/* form "Deliver to___" with location icon section */}
                        <div id="customer-location-badge" className="a-declarative">
                          customer-location-badge-palceholder
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