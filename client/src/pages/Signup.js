import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { CREATE_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [createUser] = useMutation(CREATE_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await createUser({
      variables: {
        email: formState.email, password: formState.password, displayName: formState.displayName
      }
    });
    const token = mutationResponse.data.createUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="displayName">Display Name:</label>
          <input
            placeholder="Display Name"
            name="displayName"
            type="displayName"
            id="displayName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default Signup;