import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeUser } from "../actions";
import Payments from "./Payments";

class Header extends Component {
  handleLogout = () => {
    this.props.removeUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={isAuthenticated ? "/survey" : "/"} className="brand-logo">
              Emaily
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {!isAuthenticated ? (
                <span>
                  <li>
                    <a href="/auth/google">Login with Google</a>
                  </li>
                </span>
              ) : (
                <span>
                  <li>
                    <Link to="/pay">Buy Credits</Link>
                  </li>
                  <li>Credits : {user.credits ? user.credits : 0}</li>
                  <li>
                    <Link to="/survey">Survey</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={this.handleLogout.bind(this)}>
                      Logout
                    </Link>
                  </li>
                </span>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { removeUser }
)(Header);
