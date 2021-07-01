import { useRef } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "contexts/Auth";
import {
  BothFlex,
  LoginBox,
  RedBtn,
  GrayBtn,
  RedBoldTxt,
} from "styles/etcStyles";

const Label = styled.label`
  display: inline-block;
  width: 5rem;
`;
const Input = styled.input`
  width: calc(100% - 6rem);
`;

export function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password });

    if (error) {
      alert("error signing in");
    } else {
      // Redirect user to Dashboard
      history.push("/");
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BothFlex style={{ height: "100%" }}>
        <RedBoldTxt style={{ letterSpacing: "12px" }}>TODOLIST</RedBoldTxt>
        <LoginBox>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "2rem" }}>
              <Label htmlFor="input-email">이메일</Label>
              <Input id="input-email" type="email" ref={emailRef} />
            </div>
            <div>
              <Label htmlFor="input-password">비밀번호</Label>
              <Input id="input-password" type="password" ref={passwordRef} />
            </div>

            <div style={{ marginTop: "3rem" }}>
              <RedBtn style={{ width: "18rem" }} type="submit">
                로그인
              </RedBtn>
            </div>
          </form>
          <GrayBtn
            style={{ width: "18rem" }}
            onClick={() => history.push("/signup")}
          >
            회원가입
          </GrayBtn>{" "}
        </LoginBox>
      </BothFlex>
    </div>
  );
}
