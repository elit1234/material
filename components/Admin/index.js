import { useState } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import SideNav from "./SideNav";
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../redux/store"

const OuterWrapper = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Admin = () => {
  const [active, setActive] = useState(false);

  const handleLogin = async () => {

    await dispatch(setUser({
      username: "test username",
      token: "test token"
    }))
  };





  return (
    <OuterWrapper>
      <Wrapper
        onClick={() => {
          if (active) setActive(!active);
        }}
      >
        <TopBar pageTitle="Admin Panel" active={active} setActive={setActive} />
        <h1>Welcome to Admin Panel</h1>
        <button onClick={() => handleLogin()}>Login</button>
      </Wrapper>
      <SideNav active={active} setActive={setActive} />
    </OuterWrapper>
  );
};

export default Admin;
