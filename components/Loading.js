import styled from "styled-components";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

const LoadingWrapper = styled.div`
  visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  max-width: 100%;
  height: 300px;
`;

const LoadingBar = styled.div`
  height: 32px;
  background: ${(props) => (props.secondary ? `#c3c3c3` : `#6c63ff`)};
  border-radius: 12px;

  visibility: hidden;
`;

const Loading = ({ loading, stopLoading }) => {
  const tl = gsap.timeline({ paused: true });

  const animRef = useRef(null);

  const loadingWrapperRef = useRef(null);
  const firstLoadBar = useRef(null);
  const secondLoadBar = useRef(null);
  const thirdLoadBar = useRef(null);

  useEffect(() => {
    animRef.current = tl

      .to(loadingWrapperRef.current, {
        autoAlpha: 1,
        ease: "sine.out",
        width: "100%",
      })
      .to(
        firstLoadBar.current,
        {
          autoAlpha: 1,
          width: "250px",
          duration: 1,
          ease: "back.out(5)",
        },
        0
      )
      .to(
        secondLoadBar.current,
        {
          autoAlpha: 1,
          width: 250,
          duration: 1.5,
          ease: "back.out(4)",
        },
        1
      )
      .to(
        thirdLoadBar.current,
        {
          autoAlpha: 1,
          width: 250,
          duration: 2,
          ease: "back.out(3)",
        },
        2
      );
  }, []);

  useEffect(() => {
    if (loading) animRef.current.play();
  }, [loading]);

  return (
    <LoadingWrapper ref={loadingWrapperRef}>
      <LoadingBar ref={firstLoadBar} />
      <LoadingBar ref={secondLoadBar} secondary={1} />
      <LoadingBar ref={thirdLoadBar} secondary={1} />
    </LoadingWrapper>
  );
};

export default Loading;
