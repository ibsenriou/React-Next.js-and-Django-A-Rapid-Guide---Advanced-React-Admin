import axios from 'axios';
import { config } from 'process';
import { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitFormHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    await axios.post(
      'login/',
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/'} />;
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submitFormHandler}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
