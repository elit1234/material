import styled from "styled-components";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import BottomPopup from "../BottomPopup";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/store";
import { useRouter } from "next/router";
import { getDark } from "../userFuncs";
import axios from "axios";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  min-height: 300px;
`;

const LoginBox = styled.div`
  width: 70vw;
  height: 70vh;
  background: ${(props) => (props.dark ? `#181818` : `#fff`)};
  visibility: hidden;

  @media (max-width: 450px) {
    width: 90vw;
  }
`;

const Title = styled.p`
  font-size: 38px;
  font-weight: bold;
  visibility: hidden;
  text-align: center;
  font-family: Segoe UI, sans-serif;
  cursor: default;
`;

const Form = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SuccessWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  visibility: hidden;
`;

const LoadingWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  visibility: hidden;
`;

const Input = styled.input`
  visibility: hidden;
  height: 32px;
  border: none;
  width: 80%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  &:focus {
    outline: none;
  }
  padding-left: 10px;
  color: #000;
`;

const LoginButton = styled.div`
  cursor: pointer;
  height: 64px;
  background-color: #2c387e;
  visibility: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  width: 40%;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: bold;
`;

const Login = () => {
  const tl = gsap.timeline({ rotation: 0.01 });
  const dispatch = useDispatch();
  const router = useRouter();
  const dark = getDark();

  const animRef = useRef(null);

  const boxRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);

  const successWindowRef = useRef(null);
  const loadingWindowRef = useRef(null);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateValue = (name, val) => {
    return setValues({
      ...values,
      [name]: val,
    });
  };

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        boxRef.current,
        {
          scale: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
        },
        0
      )
      .fromTo(
        titleRef.current,
        {
          x: "-100vw",
        },
        {
          x: 0,
          duration: 0.8,
          autoAlpha: 1,
          delay: 0.3,
        },
        0
      )
      .fromTo(
        usernameRef.current,
        {
          x: "100vw",
        },
        {
          x: 0,
          duration: 0.8,
          autoAlpha: 1,
          delay: 0.6,
        },
        0
      )
      .fromTo(
        passwordRef.current,
        {
          x: "-100vw",
        },
        {
          x: 0,
          duration: 0.8,
          autoAlpha: 1,
          delay: 0.6,
        },
        0
      )
      .fromTo(
        loginButtonRef.current,
        {
          x: "100vw",
        },
        {
          x: 0,
          duration: 0.8,
          autoAlpha: 1,
          delay: 0.8,
        },
        0
      );
  }, []);

  const handleLogin = () => {
    if (!error && !loading && values.username && values.password) {
      setLoading(true);

      axios({
        method: "post",
        url: "http://localhost:3000/api/login",
        data: values,
      }).then((res) => {
        const { data } = res;
        if (data) {
          console.log("success: " + data.success);
          const { success, userData } = data;

          if (success && userData) {
            setSuccess("Welcome, " + values.username);
            dispatch(
              setUser({
                admin: userData.admin,
                id: userData.id,
                token: userData.token,
                username: values.username,
              })
            );
          }
        }
      });

      animRef.current = tl
        .to(
          formRef.current,
          {
            x: "-60vw",
            autoAlpha: 0,
            duration: 0.5,
          },
          0
        )
        .to(
          titleRef.current,
          {
            x: "-60vw",
            autoAlpha: 0,
            duration: 0.5,
          },
          0
        )
        .to(
          formRef.current,
          {
            height: 0,
            delay: 0.5,
          },
          0
        )
        .to(
          titleRef.current,
          {
            height: 0,
            delay: 0.5,
          },
          0
        )
        .to(
          loadingWindowRef.current,
          {
            height: "100%",
            duration: 0.1,
          },
          0
        )
        .fromTo(
          loadingWindowRef.current,
          {
            x: "100vw",
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.5,
          },
          1
        );
    }
  };

  useEffect(() => {
    if (success) {
      animRef.current = tl
        .to(
          loadingWindowRef.current,
          {
            x: "-60vw",
            autoAlpha: 0,
            delay: 1,
            duration: 0.5,
          },
          1
        )

        .to(
          successWindowRef.current,
          {
            height: "100%",
            duration: 0.1,
          },
          1
        )
        .to(
          loadingWindowRef.current,
          {
            height: 0,
            duration: 0.1,
            delay: 0.5,
          },
          2
        )
        .fromTo(
          successWindowRef.current,
          {
            x: "100vw",
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
          },
          3
        );
    }
  }, [success]);

  return (
    <Wrapper>
      <LoginBox ref={boxRef} dark={dark ? 1 : 0}>
        <Title ref={titleRef}>Please login</Title>
        <Form ref={formRef}>
          <Input
            ref={usernameRef}
            placeholder="Username"
            value={values.username}
            onChange={(e) => {
              updateValue("username", e.target.value);
            }}
            onKeyPress={(k) => {
              if (k.key === "Enter") handleLogin();
            }}
            dark={dark ? 1 : 0}
          />
          <Input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => {
              updateValue("password", e.target.value);
            }}
            onKeyPress={(k) => {
              if (k.key === "Enter") handleLogin();
            }}
            dark={dark ? 1 : 0}
          />
          <LoginButton ref={loginButtonRef} onClick={() => handleLogin()}>
            Login
          </LoginButton>
        </Form>
        <LoadingWindowWrapper ref={loadingWindowRef} loading={loading ? 1 : 0}>
          Please wait...
        </LoadingWindowWrapper>

        <SuccessWindowWrapper ref={successWindowRef} success={success ? 1 : 0}>
          <h1>{success && success}</h1>
        </SuccessWindowWrapper>
      </LoginBox>
      <BottomPopup message={error} setMessage={setError} type="error" />
    </Wrapper>
  );
};

export default Login;
