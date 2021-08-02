import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { useRouter } from "next/router";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
  min-height: 100vh;
  width: 40vw;
  background: #fff;
  visibility: hidden;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  position: absolute;
  left: 0;
  top: 0;
`;

const Option = styled.div`
  ${(props) =>
    props.bgColour &&
    `
    background-color: ${props.bgColour};
  `};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
`;

const SideNav = ({ active, setActive }) => {
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true });
  const router = useRouter();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        wrapperRef.current,
        {
          autoAlpha: 0,
          x: "-30vw"
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "power1.inOut"
        },
        0
      )
      .reverse();
  }, []);

  useEffect(() => {
    if (!active) {
      animRef.current.reverse().then(() => {
        setActive(false);
      });
    } else
      animRef.current.play().then(() => {
        setActive(true);
      });
  }, [active]);

  useEffect(() => {
    let arr = [];
    arr.push(
      {
        bgColour: "#03a9f4",
        label: "Home",
        link: ""
      },
      {
        bgColour: "#f44336",
        label: "Users",
        link: "users"
      },
      {
        bgColour: "#618833",
        label: "Numbers",
        link: "numbers"
      }
    );

    setOptions(arr);
  }, []);

  const handleClick = (link) => {
    animRef.current.reverse().then(() => {
      let newLink = "";
      if (link) newLink = `/admin/${link}`;
      else newLink = "/admin";

      router.push(newLink);
      setActive(false);
    });
  };

  return (
    <Wrapper ref={wrapperRef}>
      {options &&
        options.map((option, key) => {
          return (
            <Option
              key={key}
              bgColour={option.bgColour && option.bgColour}
              onClick={() => handleClick(option.link && option.link)}
            >
              {option.label}
            </Option>
          );
        })}
    </Wrapper>
  );
};

export default SideNav;
