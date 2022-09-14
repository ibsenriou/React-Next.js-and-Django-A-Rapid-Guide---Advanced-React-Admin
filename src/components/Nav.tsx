import axios from 'axios';
import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

const Nav = (props: { user: User | null }) => {
  const logoutHandler = async (event: SyntheticEvent) => {
    await axios.post('logout/');
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
        Company name
      </a>

      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link to={'/profile'} className="nav-link px-3" href="#">
            {props.user?.first_name} {props.user?.last_name}
          </Link>
          <Link
            to={'/login'}
            onClick={logoutHandler}
            className="nav-link px-3"
            href="#"
          >
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default connect((state: { user: User }) => ({
  user: state.user,
}))(Nav);
