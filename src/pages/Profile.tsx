import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { Dispatch, SyntheticEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { User } from '../models/user';
import { setUser } from '../redux/actions/setUserAction';

const Profile = (props: any) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { data } = await axios.put('users/info', {
      first_name,
      last_name,
      email,
    });

    props.setUser(data);
  };

  const passwordSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    await axios.put('users/password', {
      password,
      password_confirm,
    });
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmitHandler}>
        <div className="mb-3">
          <TextField
            label="First Name"
            onChange={(event) => setFirstName(event.target.value)}
            value={first_name}
          />
        </div>

        <div className="mb-3">
          <TextField
            label="Last Name"
            onChange={(event) => setLastName(event.target.value)}
            value={last_name}
          />
        </div>

        <div className="mb-3">
          <TextField
            label="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmitHandler}>
        <div className="mb-3">
          <TextField
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <TextField
            label="Password Confirm"
            type="password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Profile);
