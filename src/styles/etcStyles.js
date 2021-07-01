import styled from "styled-components";

export const NavBar = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #8b0f0e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

export const WhiteBtn = styled.button`
  border: 1px solid #fff;
  border-radius: 0.5rem;
  background: 0;
  padding: 0.5rem;
  color: #fff;
`;

export const RedBtn = styled(WhiteBtn)`
  background-color: #8b0f0e;
  color: #fff;
`;

export const GrayBtn = styled(WhiteBtn)`
  background-color: gray;
  color: #fff;
`;

export const BothFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginBox = styled.div`
  width: 20rem;
  height: 15rem;
  padding: 1rem;
  border: 1px solid #8b0f0e;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RedBoldTxt = styled.div`
  color: #8b0f0e;
  font-weight: 800;
  font-size: 2rem;
`;

export const BlueBtn = styled(RedBtn)`
  background-color: #8ebeb6;
  padding: 0.5rem 1rem;
`;
