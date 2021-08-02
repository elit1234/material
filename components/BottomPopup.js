import styled from "styled-components";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";


const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 25;
    ${props => props.type === 'error' && `
        background-color: #b2102f;
    `}
    min-height: 10vh;
    visibility: hidden;
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
`

const BottomPopup = ({ message, setMessage, type }) => {
    const animRef = useRef(null);
    const wrapperRef = useRef(null);
    const tl = gsap.timeline({
        paused: true
    });

    useEffect(() => {
        animRef.current = tl.fromTo(
            wrapperRef.current,
            {
                y: "30vh"
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.8
            }
        )


        
    }, [])


    useEffect(() => {
        if(message.length > 0) {
            animRef.current.play().then(() => {
                setTimeout(() => {
                    animRef.current.reverse()
                    setMessage("")
                }, 3000)
            })

        }
    }, [message])

    return (
        <Wrapper ref={wrapperRef} type={type ? type : 0}>
            {message && message}
        </Wrapper>

    )
}

export default BottomPopup;