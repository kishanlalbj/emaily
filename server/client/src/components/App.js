import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import { getUser } from "../actions";
import Landing from "./Landing";
import Payments from "./Payments";

const Survey = () => <h4>No surveys yet</h4>;

class App extends Component {
  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/survey" component={Survey} />
            <Route exact path="/pay" component={Payments} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUser }
)(App);
