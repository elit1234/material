import { useState } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

const OuterWrapper = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Users = () => {
  const [active, setActive] = useState(false);
  return (
    <OuterWrapper>
      <Wrapper
        onClick={() => {
          if (active) setActive(!active);
        }}
      >
        <TopBar pageTitle="Users" active={active} setActive={setActive} />
        <h1>Search for a user below</h1>
      </Wrapper>
      <SideNav active={active} setActive={setActive} />
    </OuterWrapper>
  );
};

export default Users;
