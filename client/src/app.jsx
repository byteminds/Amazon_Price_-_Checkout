import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
import '../src/app.css';

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
      TwoYrProtectionPlanCost: null,
      customerCity: null,
      customerZip: null,
      customerName: null
    }
  }

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

  createDeliveryArrivesMessage() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (this.state.isPrime === "true") {
      let d = new Date();
      let deliveryDate = days[d.getDay()+2];
      return(
        <div id="arrives-by-message" className="a-section a-spacing-none a-spacing-top-mini">
          FREE Delivery: <b className="a-text-bold">{deliveryDate} </b>
          <br/>
          <span className="a-color-secondary">Order within </span>
          <span id="ship-time-CTA" className="a-color-secondary">{this.createRemainingTimeToOrder()} </span>
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

  createRemainingTimeToOrder() {
    let actualTime = new Date(Date.now());
    let endOfDay = new Date(actualTime.getFullYear(), actualTime.getMonth(), actualTime.getDate() + 1, 0, 0, 0);
    let timeRemaining = endOfDay.getTime() - actualTime.getTime();
    let timeToOrder = timeRemaining;
    let hours = Math.floor(timeToOrder / 1000 / 60 / 60);
    let minutes = Math.floor((timeToOrder / 1000 / 60 / 60 - hours) * 60);
    return `${hours} hours and ${minutes} minutes`
  }

  createDeliveryLocationData() {
    return(
      <span className="a-declarative">
        <a className="a-link-normal" href="#">
          <div className="a-row a-spacing-top-mini">
            <div className="a-column a-span12 a-text-left">
              <div className="a-text-left a-column a-span12">
                <div id="contextualIngressPt">
                  <div id="contextualIngressPtPin">
                  </div>
                  <span id="contextualIngressPtLabel">
                    <div className="contextualIngressPtLabel_deliveryShortLine">
                      <span>Deliver to {this.state.customerName} - </span><br/>
                      <span>{this.state.customerCity} {this.state.customerZip}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </span>
    )
  }

  createInStockMessage() {
    if (this.state.stockQty > 9) {
      return (
        <span className="a-size-medium a-color-success">In Stock.</span>
      )
    } else if (this.state.stockQty > 0) {
      return (
        <span className="a-size-medium a-color-price">Only {this.state.stockQty} left in stock - order soon.</span>
      )
    } else {
      return (
        <span className="a-size-medium a-color-price">Out of Stock.</span>
      )
    }
  }

  // **this is the standard-looking dropdown -> refactoring to build one that replicates Amazon's
  // populateQuantityDropdown() {
  //   let qtyElements = [];
  //   for (let i = 1; i <= this.state.stockQty; i++) {
  //       qtyElements.push(<option value={i} key={i}>{i}</option>);
  //   }
  //   return(
  //     <select name="quantity" id="quantity" autoComplete="off" className="a-native-dropdown">
  //       {qtyElements}
  //     </select>
  //   )
  // }

  componentDidMount() {
    let split = window.location.href.split("/")
    let id = split[split.length - 2];
    $.ajax({
      url: `http://ec2-3-17-206-111.us-east-2.compute.amazonaws.com/pricingAPI/${id}`,
      type: 'GET',
      success: (data) => {
        this.setState({
        Price: data[0].Price,
        isPrime: data[0].isPrime,
        stockQty: data[0].stockQty,
        shipCost: data[0].shipCost,
        soldBy: data[0].soldBy,
        subscriptionProtectionPlanCost: data[0].subscriptionProtectionPlanCost,
        TwoYrProtectionPlanCost: data[0].TwoYrProtectionPlanCost,
        customerCity: data[0].customerCity,
        customerZip: data[0].customerZip,
        customerName: data[0].customerName
        })
      },
      error: (error) => {
        console.log(`GET request error: `, error)
      }
    });
  };

  render() {
    return(
/* form overall box structure */
    <div className="a-box-group">
      <div className="a-box a-last">
        <div className="a-box-inner">
          {/* below immediately below holds each feature divs */}
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
                {/* form Prime / Shipping section */}
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
                            {this.createDeliveryArrivesMessage()}
                        </div>
                        {/* form "Deliver to___" with location icon section */}
                        <div id="customer-location-badge" className="a-declarative">
                          {this.createDeliveryLocationData()}
                        </div>
                      </div>
                    </div>                    
                  </div>
                </div>
                {/* form "In Stock info section **START HERE**" */}
                <div id="inStockAvailabilityMessage" className="feature">
                  <div className="a-section a-spacing-top-micro">
                    <div id="availability" className="a-section a-spacing-base">
                      {this.createInStockMessage()}
                    </div>
                  </div>
                  <div className="a-section a-spacing-none">
                  </div>
                </div>
                {/* form Quantity selector dropdown */}
                <div id="quantityDropdownSection" className="feature">
                  <div className="a-row a-spacing-mini">
                    <div className="a-column a-span12 a-text-center a-spacing-small">
                      <div id="quantiySelectorRow" className="a-section a-spacing-none a-padding-none">
                        {/* <span></span> necessary? */}
                        <div className="a-row a-spacing-base">
                          <div className="a-column a-span12 a-text-left">
                            <span className="a-dropdown-container">
                              {/* <label form="quantity" className="a-native-dropdown">Qty:</label>
                                {this.populateQuantityDropdown()} */}
                              <span className="a-button a-button-dropdown a-button-small">
                                {/* <span className="a-button-inner-qty"> */}
                                {/* removed above span, was causing background to bleed below bottom of button */}
                                  <span className="a-button-text a-declarative" role="button" aria-hidden="true" aria-pressed="false">
                                    <span className="a-dropdown-label">Qty:</span>
                                    <span className="a-dropdown-prompt">1</span>
                                  </span>
                                  <span className="a-icon a-icon-dropdown"></span>
                                {/* </span> */}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* form price and shipping confirmation above ATC button */}
                <div id="price-and-shipping-confirmation" className="feature">
                  <div className="a-spacing-small a-text-center">
                    <span className="a-color-price">${this.state.Price}</span>
                    <span className="a-size-small"> + Free Shipping</span>
                  </div>
                </div>
                {/* form Add To Cart button */}
                <div id="add_to-cart-container" className="feature">
                  <div className="a-button-stack">
                    <span className="a-declarative">
                      <span id="clickable-add-to-cart" className="a-button a-spacing-small a-button-primary a-button-icon">
                        <span className="a-button-inner">
                          <i className="a-icon a-icon-cart"></i>
                          <input id="button-click-section" className="a-button-input attach-dss-atc" value="Add to Cart" type="button"></input>
                          <span className="a-button-text" hidden="true">Add to Cart</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                {/* form Buy it Now button */}
                <div id="buyNow_feature_div" className="feature">
                  <div className="a-button-stack">
                    <div id="buyNow" className="a-section a-spacing-base">
                      <div id="turboState" className="a-section a-spacing-none a-padding-none">
                        <script id="notUsedForAnythingCurrently"></script>
                      </div>
                      <script id="notUsedForAnythingCurrently"></script>
                      <span className="a-declarative" id="turbo-checkout-modal"></span>
                      <span id="submit.buy-now" className="a-button a-button-icon a-button-oneclick onml-buy-now-button">
                        <span className="a-button-inner">
                          <i className="a-icon a-icon-buynow" role="img"></i>
                          <input id="buy-now-button" name="submit.buy-now" className="a-button-input" type="submit"></input>
                          <span id="submit.buy-now-announce" className="a-button-text">Buy Now</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {/* for ships from merchant message */}
                <div id="ships-from-merchant-message" className="feature">
                  <div className="a-section a-spacing-medium">
                    <div id="merchant-info" className="a-section a-spacing-mini">
                      <span>Ships from and sold by
                        <a href="http://giphygifs.s3.amazonaws.com/media/5ftsmLIqktHQA/giphy.gif"> {this.state.soldBy}</a>
                      </span>
                    </div>
                  </div>
                </div>
                {/* form protection plan container */}
                <div id="protection-plan-box" className="feature">
                  <div id="abbWrapper" className="a-section mbb__bb mbb__tsn">

                  </div>
                </div>
              </div>
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

ReactDOM.render(<pricingApp/>, document.getElementById('pricingApp'));