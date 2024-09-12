import styled from "styled-components";
import { useContext } from "react";
import { IsMobileContext } from "../contexts/IsMobileContext";
const AfterCare = () => {
  const { isMobile } = useContext(IsMobileContext);
  return (
    <Wrapper>
      {!isMobile && (
        <Title
          style={{
            fontFamily: "EthnocentricRegular, sans-serif",
            fontSize: "clamp(2rem, 3vw, 3.5rem)",
            margin: "10vh auto 0 auto",
            textShadow: "3px 3px 0px #c4b6eb, 6px 6px 0px #241441",
            letterSpacing: "0.5rem",
          }}
        >
          AFTERCARE INSTRUCTIONS
        </Title>
      )}
      <Top>
        <UnorderedList>
          <Title style={{ fontSize: "1.5rem", textDecoration: "underline" }}>
            WHAT TO DO
          </Title>
          <SmallTitles>KEEP IT COVERED</SmallTitles>
          <ListItem>
            Your new tattoo either has a second skin or simply saran wrap on it.
            Keep it covered for 3-5 days when using a second skin, and 4-7 hours
            when using wraps (change the wrap about 3 times a day, cleaning it
            before rewrapping it).
          </ListItem>
          <SmallTitles>KEEP IT CLEAN</SmallTitles>
          <ListItem>
            After removing the wrap (or the second skin), gently wash your
            tattoo with lukewarm water and mild/fragrance free soap. <br />
            Pat it dry with a clean paper towel, or let it air dry for 10-15
            minutes.
          </ListItem>
          <SmallTitles>MOISTURIZE IT</SmallTitles>
          <ListItem>
            Apply a thin layer of unscented moisturizer to keep the skin
            hydrated. Avoid using too much, as it can suffocate the skin.
          </ListItem>
          <SmallTitles>AVOID SUN EXPOSURE</SmallTitles>
          <ListItem>
            Avoid direct sunlight, tanning beds, and swimming pools/hot tubs for
            at least 2 weeks. <br />
            UV rays can fade the ink and damage the skin.
          </ListItem>
          <SmallTitles>LET IT BREATHE</SmallTitles>
          <ListItem>
            Wear loose clothing to avoid rubbing the tattoo. <br />
            Avoid tight clothing, as it can irritate the skin.
          </ListItem>
        </UnorderedList>
        <ImgWrapp>
          <OverLay />
          <Image src="https://instagram.fyhu2-1.fna.fbcdn.net/v/t39.30808-6/434331300_18432719158028802_1177750964830244053_n.jpg?stp=dst-jpg_e35_p480x480&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyhu2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=j12xEtpvW1gQ7kNvgHINNMe&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzMzNzQ5ODA0MTc4NTQ2MzU2NQ%3D%3D.3-ccb7-5&oh=00_AYAr3rVHlp68h0_cHX7oVTY2bY35cVepsOTNAaM7urL3pw&oe=66DDA0CC&_nc_sid=8f1549"></Image>
        </ImgWrapp>
      </Top>
      <Bottom>
        {!isMobile && (
          <ImgWrapp>
            <OverLay />
            <Image src="https://instagram.fyhu2-1.fna.fbcdn.net/v/t39.30808-6/429799695_18428110579028802_4720549918623232767_n.jpg?stp=dst-jpg_e35_p720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyhu2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=pLvW8Dfe8XMQ7kNvgE_qbWQ&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzMxODY0ODA1NTMxNjM3NzY5OA%3D%3D.3-ccb7-5&oh=00_AYBFexgJg4Z8sJgiMYGFl-utdhVSZnHNo-8AfXrYB50EEw&oe=66DDBABF&_nc_sid=8f1549"></Image>
          </ImgWrapp>
        )}
        <UnorderedList>
          <Title style={{ fontSize: "1.5rem", textDecoration: "underline" }}>
            WHAT NOT TO DO
          </Title>
          <SmallTitles>AVOID SCRATCHING OR PICKING</SmallTitles>
          <ListItem>
            As your tattoo heals, it will itch or peel. Resist the urge to
            scratch or pick at it, as it can cause scarring or pull out the ink.
            Instead, gently tap or slap the area to relieve the itch.
          </ListItem>
          <SmallTitles>AVOID SHAVING THE AREA</SmallTitles>
          <ListItem>
            Avoid shaving the area until it is fully healed. Shaving can
            irritate the skin and potentially damage the healing tattoo.
          </ListItem>
          <SmallTitles>AVOID SOAKING THE TATTOO</SmallTitles>
          <ListItem>
            Avoid soaking the tattoo in water for long periods, as it can cause
            the ink to fade or the skin to become waterlogged.
          </ListItem>
          <SmallTitles>AVOID EXPOSING TATTOO TO EXCESSIVE HEAT</SmallTitles>
          <ListItem>
            Avoid exposing the tattoo to excessive heat, such as saunas, steam
            rooms or the sun. Heat can cause the skin to swell and the tattoo to
            become irritated.
          </ListItem>
        </UnorderedList>
        {isMobile && (
          <ImgWrapp>
            <OverLay />
            <Image src="https://instagram.fyhu2-1.fna.fbcdn.net/v/t39.30808-6/429799695_18428110579028802_4720549918623232767_n.jpg?stp=dst-jpg_e35_p720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyhu2-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=pLvW8Dfe8XMQ7kNvgE_qbWQ&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzMxODY0ODA1NTMxNjM3NzY5OA%3D%3D.3-ccb7-5&oh=00_AYBFexgJg4Z8sJgiMYGFl-utdhVSZnHNo-8AfXrYB50EEw&oe=66DDBABF&_nc_sid=8f1549"></Image>
          </ImgWrapp>
        )}
      </Bottom>
    </Wrapper>
  );
};
const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 31.5vw;
  aspect-ratio: 4/5;
  background-color: rgba(66, 0, 255, 0.38);
  @media (max-width: 1000px) {
    width: 80vw;
  }
`;

const Image = styled.img`
  width: 31.5vw;
  aspect-ratio: 4/5;
  object-fit: cover;
  @media (max-width: 1000px) {
    width: 80vw;
  }
`;

const ImgWrapp = styled.div`
  position: relative;
  width: 31.5vw;
  aspect-ratio: 4/5;
  @media (max-width: 1000px) {
    width: 80vw;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 5vh;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 5vh;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  background-color: #bbabe8;
  font-family: "arial", sans-serif;
  letter-spacing: 0.1rem;
  color: #241441;
  margin: 0;
`;
const ListItem = styled.li`
  font-size: 14px;
  color: #241441;
  padding: 0.5rem;
  border: 1px solid #241441;
`;

const SmallTitles = styled.h2`
  font-size: 1.1rem;
  color: #241441;
  letter-spacing: 0.1rem;
  font-family: "arial", sans-serif;
  opacity: 0.8;
`;

const Wrapper = styled.div`
  min-height: 92vh;
  top: 8vh;
  position: relative;
  display: flex;
  flex-direction: column;
  color: #241441;
  background-color: #bbabe8;
  @media (min-width: 1000px) {
    padding: 0 10vw;
    top: 10vh;
    background-color: #bbabe8;
    gap: 10vh;
    padding-bottom: 10vh;
    align-items: center;
  }
`;
const UnorderedList = styled.ul`
  padding-left: 2rem;
  padding-right: 1rem;
  list-style-type: none;
  &:first-of-type {
    margin-top: 2vh;
  }
`;

export default AfterCare;
