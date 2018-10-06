import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleStripeToken } from "../actions";

class Payments extends Component {
  render() {
    return (
      <div>
        <h3>Buy 5 Credits for just $0.5</h3>
        <StripeCheckout
          name="Emaily"
          description="Pay for the course"
          amount={50}
          token={token => this.props.handleStripeToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Add Credits</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(
  null,
  { handleStripeToken }
)(Payments);
