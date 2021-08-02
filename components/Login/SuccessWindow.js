import styled from "styled-components";
import { useRef, useEffect } from "react"
import {gsap} from "gsap";
const Wrapper = styled.div`
    
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    
    height: 100%;
    width: 100%;
`

const SuccessWindow = ({ success }) => {
    const animRef = useRef(null);
    const wrapperRef = useRef(null);
    const tl = gsap.timeline({})
    

    useEffect(() => {
        animRef.current = tl.fromTo(
            wrapperRef.current,
            {
                autoAlpha: 0,
                x: "100vw",

            },
            {
                x: 0,
                autoAlpha: 1
            }
        )
        .play()

        console.log("hit here")
    }, [success])
    return (
        <Wrapper>
            {success && success}
        </Wrapper>
    )

}

export default SuccessWindow;