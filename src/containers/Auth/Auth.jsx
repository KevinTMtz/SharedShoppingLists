import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import ButtonsDiv from '../../components/Button/ButtonsDiv';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router';

const Auth = () => {
  const history = useHistory();

  const auth = getAuth();

  const [button, setButton] = useState(1);
  const [userData, setUserData] = useState({ email: '', password: '' });

  const login = async () => {
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then(() => {
        console.log('Login successful');
        history.push('/');
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const register = async () => {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    )
      .then(() => {
        console.log('Register successful');
        history.push('/');
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div>
      <h1>Authentication</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (button === 1) {
            login();
          } else {
            register();
          }
        }}
      >
        <input
          placeholder='Email'
          required
          value={userData.email}
          onChange={(event) =>
            setUserData({ ...userData, ...{ email: event.target.value } })
          }
        />
        <input
          placeholder='Password'
          type='password'
          required
          value={userData.password}
          onChange={(event) =>
            setUserData({ ...userData, ...{ password: event.target.value } })
          }
        />
        <ButtonsDiv>
          <Button type='submit' onClick={() => setButton(1)}>
            Login
          </Button>
          <Button
            type='submit'
            className='secondary'
            onClick={() => setButton(2)}
          >
            Register
          </Button>
        </ButtonsDiv>
      </form>
    </div>
  );
};

export default Auth;
