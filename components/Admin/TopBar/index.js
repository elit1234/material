import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import Head from 'next/head'
import { useRouter } from "next/router"


import MenuIcon from "../../MenuIcon";
import {checkAdminToken, getUser} from "../adminFunc";
import { getDark } from "../../userFuncs";

const Container = styled.div`
  height: 15vh;
  width: 100%;
  background: ${props => !props.dark ? `#2196f3` : `#181818`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  visibility: hidden;
`;

const PageTitleWrapper = styled.div``;

const PageTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  cursor: default;
`;

const MenuIconWrapper = styled.div``;

const TopBar = ({ pageTitle, active, setActive }) => {
  const animRef = useRef(null);
  const wrapperRef = useRef(null);
  const tl = gsap.timeline({});
  const router = useRouter();
  const isAdmin = checkAdminToken();
  const user = getUser();
  const dark = getDark();
 


  useEffect(() => {
    if(!isAdmin) {
       router.push("/");
    }
  }, [isAdmin])

  useEffect(() => {
      animRef.current = tl.fromTo(
        wrapperRef.current,
        {
          y: "-30vh"
        },
        {
          y: 0,
          duration: 0.8,
          autoAlpha: 1
        }
      );
    
  }, [])

  return (
    <Container
      ref={wrapperRef}
      onClick={() => {
        if (active) setActive(!active);
      }}
      dark={dark ? 1 : 0}
    >
      <Head>
        <title>{pageTitle ? `${user && user.username && user.username} - ${pageTitle}` : "Admin Panel"}</title>

      </Head>
      <MenuIconWrapper>
        <MenuIcon active={active} setActive={setActive} />
      </MenuIconWrapper>
      <PageTitleWrapper>
        <PageTitle>{pageTitle && pageTitle}</PageTitle>
      </PageTitleWrapper>
    </Container>
  );
};

export default TopBar;
