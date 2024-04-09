import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Spinner from '../../generics/spinner/Spinner';
import FormControl from '../../generics/formControl/FormControl';

import { loginUser } from '../../../services/authService';

import { setApplicationStorage } from '../../../utilities/storage';

import styles from './Login.module.scss';

function Login() {

  const navigate = useNavigate();

  const [rootState, setRootState] = useState({
    email: '',
    password: '',
    isLoading: false
  });

  async function handleSubmitControlClick() {

    setRootState((_rootState) => {
      return {
        ..._rootState,
        isLoading: true
      };
    });

    const params = {
      email: rootState.email,
      password: rootState.password
    };

    const response = await loginUser(params);

    if (response.data?.statusCode === 200) {
      navigate('/userDashboard');
      setApplicationStorage(response.data?.data);
    } else {
      toast.error(response.data?.message);
    }

    setRootState((_rootState) => {
      return {
        ..._rootState,
        isLoading: false
      };
    });

  }

  function handleInputControlChange(name, value) {
    setRootState((_rootState) => {
      return {
        ..._rootState,
        [name]: value
      };
    });
  }

  function renderSubmitControl() {

    const submitControlAttributes = {
      className: 'btn btn-primary',
      onClick: handleSubmitControlClick
    };

    return (
      <div className="d-grid mb-3">
        <button {...submitControlAttributes}>
          Submit
        </button>
      </div>
    );

  }

  function renderLoginForm() {

    if (rootState.isLoading === true) {
      return <Spinner />;
    }

    const emailControlAttributes = {
      label: 'Email address',
      type: 'email',
      name: 'email',
      placeholder: 'Enter email',
      value: rootState.email,
      onChange: handleInputControlChange
    };

    const passwordControlAttributes = {
      label: 'Password',
      type: 'password',
      name: 'password',
      placeholder: 'Enter password',
      value: rootState.password,
      onChange: handleInputControlChange
    };

    return (
      <div id={styles.loginForm}>

        <h3 className='mb-3'>Sign In</h3>

        <FormControl {...emailControlAttributes} />
        <FormControl {...passwordControlAttributes} />

        {renderSubmitControl()}

        <p className="forgot-password text-right mb-2">
          Don't have an account? <Link to='/register'>Register Here</Link>
        </p>

      </div>
    );
  }

  return (
    <div id={styles.loginFormMain}>
      {renderLoginForm()}
    </div>
  );

}

export default Login