import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100vw;
  height: 100vh;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  visibility: hidden;
  width: 30%;
  height: 30%;
  border-radius: 24px;
  border: 0;
  cursor: pointer;
  font-family: Segoe UI, sans-serif;
  font-weight: bold;
  font-size: 130%;
  ${(props) =>
    props.bgColour &&
    `
    background-color: ${props.bgColour};
  `};

  ${(props) =>
    props.colour &&
    `
    color: ${props.colour};
  `};
  @media (max-width: 400px) {
    width: 70%;
  }
`;

const Home = (props) => {
  const adminButton = useRef(null);
  const userButton = useRef(null);
  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true, rotation: 0.01 });
  const router = useRouter();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        adminButton.current,
        {
          x: "-100vw",
        },
        {
          x: 0,
          duration: 1.2,
          autoAlpha: 1,
        },
        0
      )
      .fromTo(
        userButton.current,
        {
          x: "100vw",
        },
        {
          x: 0,
          duration: 1.2,
          autoAlpha: 1,
        },
        1
      )

      .play();
  }, []);

  const handleClick = (opt) => {
    if (opt === 1)
      animRef.current = tl
        .fromTo(
          userButton.current,
          {
            scale: 1,
          },
          {
            scale: 0,
            autoAlpha: 0,
            duration: 0.5,
          }
        )
        .fromTo(
          adminButton.current,
          {
            rotate: 0,
          },
          {
            rotate: 360,
            width: "90vw",
            duration: 0.8,
          }
        );
    else
      animRef.current = tl
        .fromTo(
          adminButton.current,
          {
            scale: 1,
          },
          {
            scale: 0,
            autoAlpha: 0,
            duration: 0.5,
          }
        )
        .fromTo(
          userButton.current,
          {
            rotate: 0,
          },
          {
            rotate: 360,
            duration: 1.2,
          }
        );

    animRef.current.play().then(() => {
      if (opt === 1) {
        if (user && user.username && user.token) {
          router.push("/admin");
        } else router.push("/login");
      } else router.push("/user");
    });
  };

  return (
    <Wrapper>
      <Button
        bgColour="#ff0000"
        colour="#fff"
        ref={adminButton}
        onClick={() => handleClick(1)}
      >
        Admin
      </Button>
      <Button
        bgColour="#00a5ff"
        colour="#000"
        ref={userButton}
        onClick={() => handleClick(2)}
      >
        User
      </Button>
    </Wrapper>
  );
};

export default Home;
