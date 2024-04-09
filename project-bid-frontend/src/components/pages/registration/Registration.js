import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import userRoles from '../../../constants/userRoles';

import { registerUser } from '../../../services/authService';

import Spinner from '../../generics/spinner/Spinner';
import FormControl from '../../generics/formControl/FormControl';

import styles from './Registration.module.scss';

function Registration() {

  const navigate = useNavigate();

  const [rootState, setRootState] = useState({
    name: '',
    email: '',
    password: '',
    isLoading: false
  });

  function handleInputControlChange(name, value) {
    setRootState((_rootState) => {
      return {
        ..._rootState,
        [name]: value
      };
    });
  }

  async function handleSignupControlClick() {

    setRootState((_rootState) => {
      return {
        ..._rootState,
        isLoading: true
      };
    });

    const params = {
      email: rootState.email,
      password: rootState.password,
      name: rootState.name,
      role: userRoles.endUser
    };

    const response = await registerUser(params);

    if (response.data?.statusCode === 200) {
      toast.success('Account created!, Please login to continue.');
      navigate('/');
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

  function renderSubmitControl() {

    const signupControlAttributes = {
      className: 'btn btn-primary',
      onClick: handleSignupControlClick
    };

    return (
      <div className="d-grid mb-3">
        <button {...signupControlAttributes}>
          Signup
        </button>
      </div>
    );

  }

  function renderRegistrationForm() {

    if (rootState.isLoading === true) {
      return <Spinner />;
    }

    const nameControlAttributes = {
      label: 'Email full name',
      type: 'text',
      name: 'name',
      placeholder: 'Enter full name',
      value: rootState.name,
      onChange: handleInputControlChange
    };

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
      <div id={styles.registrationForm}>
        <h3>Sign Up</h3>

        <FormControl {...nameControlAttributes} />
        <FormControl {...emailControlAttributes} />
        <FormControl {...passwordControlAttributes} />

        {renderSubmitControl()}

        <p className="forgot-password text-right">
          Already registered? <Link to='/'>Sign in</Link>
        </p>
      </div>
    );

  }

  return (
    <div id={styles.registrationFormMain}>
      {renderRegistrationForm()}
    </div>
  );
}

export default Registration;