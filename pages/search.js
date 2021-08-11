import styled from "styled-components";
import { gsap } from "gsap";
import { useRef, useEffect, useState } from "react";
import Loading from "../components/Loading";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  border: 2px solid #6c63ff;
  height: 60px;
  border-radius: 12px;

  padding: 0 5px;

  width: 300px;

  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-template-rows: 1fr;
  gap: 0px 40px;
  grid-template-areas: "leftSide rightSide";
  align-items: center;

  visibility: hidden;
`;

const SearchText = styled.input`
  grid-area: leftSide;
  height: 28px;
  background: #c3c3c3;
  border-radius: 12px;
  color: #000;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
  font-weight: bold;
  visibility: hidden;
`;

const SearchIconWrapper = styled.div`
  grid-area: rightSide;
`;

const Search = () => {
  const tl = gsap.timeline({});

  const animRef = useRef(null);

  const searchWrapperRef = useRef(null);
  const searchTextRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    animRef.current = tl
      .fromTo(
        searchWrapperRef.current,
        { width: 0, autoAlpha: 0 },
        {
          autoAlpha: 1,
          width: "80%",
        }
      )
      .fromTo(
        searchTextRef.current,
        { width: 0 },
        { width: "90%", autoAlpha: 1, duration: 1, ease: "sine.out" }
      );
  }, []);

  const handleSearch = () => {
    animRef.current.reverse().then(() => {
      setLoading(true);
    });
  };

  return (
    <Container>
      <SearchWrapper ref={searchWrapperRef}>
        <SearchText ref={searchTextRef} />
        <SearchIconWrapper onClick={() => handleSearch()}>
          Icon
        </SearchIconWrapper>
      </SearchWrapper>
      <Loading loading={loading} setLoading={setLoading} />
    </Container>
  );
};

export default Search;
