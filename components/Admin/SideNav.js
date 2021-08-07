import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/store";
import { getDark } from "../userFuncs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
  min-height: 100vh;
  width: 40vw;
  background: ${(props) => (props.dark ? `#181818` : `#fff`)};

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
  color: #fff;
`;

const NightWrapper = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const SideNav = ({ active, setActive }) => {
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const tl = gsap.timeline({ paused: true });
  const router = useRouter();
  const dispatch = useDispatch();
  const dark = getDark();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        wrapperRef.current,
        {
          autoAlpha: 0,
          x: "-30vw",
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "power1.inOut",
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
        link: "",
      },
      {
        bgColour: "#f44336",
        label: "Users",
        link: "users",
      },
      {
        bgColour: "#618833",
        label: "Numbers",
        link: "numbers",
      },
      {
        bgColour: "#9e9e9e",
        label: "Logout",
        link: "logout",
      }
    );

    setOptions(arr);
  }, []);

  const handleClick = (link) => {
    animRef.current.reverse().then(() => {
      let newLink = "";
      if (link) {
        if (link !== "logout") newLink = `/admin/${link}`;
        else newLink = `/${link}`;
      } else newLink = "/admin";

      router.push(newLink);
      setActive(false);
    });
  };

  const toggleDark = () => {
    dispatch(toggleDarkMode());
    setActive(false);
  };

  return (
    <Wrapper ref={wrapperRef} dark={dark ? 1 : 0}>
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
      <NightWrapper onClick={() => toggleDark()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 20 20"
          height="48px"
          viewBox="0 0 20 20"
          width="48px"
          fill={dark ? "#fff" : "#000000"}
        >
          <rect fill="none" height="20" width="20" />
          <path d="M8.04,4.86C7.88,5.39,7.8,5.94,7.8,6.5c0,3.14,2.56,5.7,5.7,5.7c0.56,0,1.11-0.08,1.64-0.24c-0.79,2.07-2.8,3.54-5.14,3.54 c-3.03,0-5.5-2.47-5.5-5.5C4.5,7.66,5.97,5.65,8.04,4.86z M10,3c-3.87,0-7,3.13-7,7s3.13,7,7,7s7-3.13,7-7 c0-0.36-0.03-0.72-0.08-1.06C16.16,10,14.91,10.7,13.5,10.7c-2.32,0-4.2-1.88-4.2-4.2c0-1.41,0.7-2.66,1.76-3.42 C10.72,3.03,10.36,3,10,3L10,3z" />
        </svg>
      </NightWrapper>
    </Wrapper>
  );
};

export default SideNav;
