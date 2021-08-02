import styled from "styled-components";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import BottomPopup from "../BottomPopup";
import SuccessWindow from "./SuccessWindow";


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    
    min-height: 300px;
`

const LoginBox = styled.div`
    width: 70vw;
    height: 70vh;
    background: #fff;
    visibility: hidden;

    @media (max-width: 450px) {
        width: 90vw
    }
`;

const Title = styled.p`
    font-size: 38px;
    font-weight: bold;
    visibility: hidden;
    text-align: center;
    font-family: Segoe UI, sans-serif;
    cursor: default;
`

const Form = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const Input = styled.input`
    visibility: hidden;
    height: 32px;
    border: none;
    width: 80%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    &:focus {
        outline: none;

    };
    padding-left: 10px;

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


`

const Login = () => {
    const tl = gsap.timeline({})
    const animRef = useRef(null);

    const boxRef = useRef(null);
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const loginButtonRef = useRef(null);

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState("")

    const updateValue = (name, val) => {
        return setValues({
            ...values,
            [name]: val
        })
    }


    const [error, setError] = useState("");
    
    useEffect(() => {
        animRef.current = tl.fromTo(
            boxRef.current,
            {
                scale: 0
            },
            {
                scale: 1,
                autoAlpha: 1,
                duration: 0.8
            },
            0
        )
        .fromTo(
            titleRef.current,
            {
                x: "-100vw"
            },
            {
                x: 0,
                duration: 0.8,
                autoAlpha: 1,
                delay: 0.3
            },
            0
        )
        .fromTo(
            usernameRef.current,
            {
                x: "100vw"
            },
            {
                x: 0,
                duration: 0.8,
                autoAlpha: 1,
                delay: 0.6
            },
            0
        )
        .fromTo(
            passwordRef.current,
            {
                x: "-100vw"
            },
            {
                x: 0,
                duration: 0.8,
                autoAlpha: 1,
                delay: 0.8
            },
            0
        ).fromTo(
            loginButtonRef.current,
            {
                x: "100vw"
            },
            {
                x: 0,
                duration: 0.8,
                autoAlpha: 1,
                delay: 0.8
            },
            0
        )
        
    }, [])


    const handleLogin = () => {
        if(!error) {
            if(values.username && values.password) {
                if(values.username === "eli") {
                    setSuccess("Welcome Eli");
                }
                else setError("Invalid username or password");
            }
            else {
                setError("Please enter a username and password")
            }
        }
    }


    useEffect(() => {
        if(success) {
            animRef.current = tl.to(
                formRef.current,
                {
                    x: "-30vw",
                    autoAlpha: 0,
                    duration: 0.8
                },
                0
            )
            .to(
                titleRef.current,
                {
                    x: "-30vw",
                    autoAlpha: 0,
                    duration: 0.8
                },
                0
            )
        }
    }, [success])

    return (
        <Wrapper>
            <LoginBox ref={boxRef}>
                <Title ref={titleRef}>Please login</Title>
                <Form ref={formRef}>
                    <Input ref={usernameRef} 
                        placeholder="Username" 
                        value={values.username}
                        onChange={(e) => {
                            updateValue("username", e.target.value)
                        }}
                    />
                    <Input ref={passwordRef} 
                        type="password"
                        placeholder="Password" 
                        value={values.password}
                        onChange={(e) => {
                            updateValue("password", e.target.value)
                        }}
                    />
                    <LoginButton ref={loginButtonRef} onClick={() => handleLogin()}>Login</LoginButton>
                </Form>
                <SuccessWindow success={success} />
            </LoginBox>
            <BottomPopup message={error} setMessage={setError} type="error" />
            
    
        </Wrapper>
    );

}

export default Login;