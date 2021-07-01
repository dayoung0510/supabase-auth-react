import { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from 'contexts/Auth';

export function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signUp } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password });

    if (error) {
      alert('error signing in');
    } else {
      // Redirect user to Dashboard
      history.push('/');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='input-email'>이메일(아이디)</label>
          <input id='input-email' type='email' ref={emailRef} />
        </div>

        <div>
          <label htmlFor='input-password'>비밀번호</label>
          <input id='input-password' type='password' ref={passwordRef} />
        </div>

        <br />

        <button type='submit'>회원가입</button>
      </form>
      <p>
        이미 아이디가 있으신가요? <Link to='/login'> 로그인 </Link>
      </p>
    </div>
  );
}
