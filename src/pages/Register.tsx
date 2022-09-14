import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');

  const [redirect, setRedirect] = useState(false);

  const formSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    const response = await axios.post(
      'register',
      {
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        password: passwordInput,
        password_confirm: passwordConfirmInput,
      }
    );

    setRedirect(true);
  };

  console.log(firstNameInput)
  console.log(lastNameInput)
  console.log(emailInput)
  console.log(passwordInput)
  console.log(passwordConfirmInput)


  if (redirect) {
    return <Redirect to={'/login'} />;
  }


  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={formSubmitHandler}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <div className="form-floating">
            <input
              className="form-control"
              placeholder="First Name"
              onChange={(event) => {
                setFirstNameInput(event.target.value);
              }}
              value={firstNameInput}
            />
            <label>First Name</label>
          </div>

          <div className="form-floating">
            <input
              className="form-control"
              placeholder="Last Name"
              onChange={(event) => {
                setLastNameInput(event.target.value);
              }}
              value={lastNameInput}
            />
            <label>Last Name</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(event) => {
                setEmailInput(event.target.value);
              }}
              value={emailInput}
            />
            <label>Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(event) => {
                setPasswordInput(event.target.value);
              }}
              value={passwordInput}
            />
            <label>Password</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password Confirm"
              onChange={(event) => {
                setPasswordConfirmInput(event.target.value);
              }}
              value={passwordConfirmInput}
            />
            <label>Password Confirm</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
