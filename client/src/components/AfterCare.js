import styled from "styled-components";
import { useContext } from "react";
import { IsMobileContext } from "../contexts/IsMobileContext";
import aftercareone from "../assets/AfterCare.jpg";
import { LanguageContext } from "../contexts/LanguageContext";
import aftercaretwo from "../assets/aftercaretwo.jpg";
const AfterCare = () => {
  const { isMobile } = useContext(IsMobileContext);
  const { language } = useContext(LanguageContext);
  return (
    <Wrapper>
      {!isMobile && (
        <Title
          style={{
            fontSize: "clamp(2rem, 3vw, 3.5rem)",
            margin: "10vh auto 0 auto",
            letterSpacing: "0.5rem",
          }}
        >
          {language === "en"
            ? "AFTERCARE INSTRUCTIONS"
            : "INSTRUCTIONS POST-TATOUAGE"}
        </Title>
      )}
      <Top>
        <UnorderedList>
          <Title style={{ fontSize: "1.5rem", textDecoration: "underline" }}>
            {language === "en" ? "WHAT TO DO" : "CE QU'IL FAUT FAIRE"}
          </Title>
          <SmallTitles>
            {language === "en" ? "KEEP IT COVERED" : "GARDER COUVERT"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "Your new tattoo either has a second skin or simply saran wrap on it. Keep it covered for 3-5 days when using a second skin, and 4-7 hours when using wraps (change the wrap about 3 times a day, cleaning it before rewrapping it)."
              : "Votre nouveau tatouage a soit une seconde peau, soit simplement du cellophane. Gardez-le couvert pendant 3-5 jours lors de l'utilisation d'une seconde peau, et 4-7 heures lors de l'utilisation de cellophane (changez le cellophane environ 3 fois par jour, en le nettoyant avant de le remballer)."}
          </ListItem>
          <SmallTitles>
            {language === "en" ? "KEEP IT CLEAN" : "GARDER PROPRE"}
          </SmallTitles>
          <ListItem>
            {language === "en" ? (
              <>
                After removing the wrap (or the second skin), gently wash your
                tattoo with lukewarm water and mild/fragrance-free soap.
                <br />
                Pat it dry with a clean paper towel, or let it air dry for 10-15
                minutes.
              </>
            ) : (
              <>
                Après avoir retiré le cellophane (ou la seconde peau), lavez
                doucement votre tatouage à l'eau tiède et au savon doux/sans
                parfum.
                <br />
                Tamponnez-le avec une serviette en papier propre, ou laissez-le
                sécher à l'air pendant 10-15 minutes.
              </>
            )}
          </ListItem>
          <SmallTitles>
            {language === "en" ? "MOISTURIZE IT" : "GARDER HYDRATÉ"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "Apply a thin layer of unscented moisturizer to keep the skin hydrated. Avoid using too much, as it can suffocate the skin."
              : "Appliquez une fine couche d'hydratant sans parfum pour garder la peau hydratée. Évitez d'en utiliser trop, car cela peut étouffer la peau."}
          </ListItem>
          <SmallTitles>
            {language === "en"
              ? "AVOID SUN EXPOSURE"
              : "ÉVITEZ L'EXPOSITION AU SOLEIL"}
          </SmallTitles>
          <ListItem>
            {language === "en" ? (
              <>
                Avoid direct sunlight, tanning beds, and swimming pools/hot tubs
                for at least 2 weeks.
                <br />
                UV rays can fade the ink and damage the skin.
              </>
            ) : (
              <>
                Évitez l'exposition directe au soleil, les lits de bronzage et
                les piscines/bains à remous pendant au moins 2 semaines.
                <br />
                Les rayons UV peuvent estomper l'encre et endommager la peau.
              </>
            )}
          </ListItem>
          <SmallTitles>
            {language === "en" ? "LET IT BREATHE" : "LAISSEZ-LE RESPIRER"}
          </SmallTitles>
          <ListItem>
            {language === "en" ? (
              <>
                Wear loose clothing to avoid rubbing the tattoo.
                <br />
                Avoid tight clothing, as it can irritate the skin.
              </>
            ) : (
              <>
                Portez des vêtements amples pour éviter de frotter le tatouage.
                <br />
                Évitez les vêtements serrés, car ils peuvent irriter la peau.
              </>
            )}
          </ListItem>
        </UnorderedList>
        <ImgWrapp>
          <OverLay />
          <Image src={aftercareone} />
        </ImgWrapp>
      </Top>
      <Bottom>
        {!isMobile && (
          <ImgWrapp>
            <OverLay />
            <Image src={aftercareone} />
          </ImgWrapp>
        )}
        <UnorderedList>
          <Title style={{ fontSize: "1.5rem", textDecoration: "underline" }}>
            {language === "en"
              ? "WHAT NOT TO DO"
              : "CE QU'IL NE FAUT PAS FAIRE"}
          </Title>
          <SmallTitles>
            {language === "en"
              ? "AVOID SCRATCHING OR PICKING"
              : "ÉVITEZ DE GRATTER OU DE DÉTERGER"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "As your tattoo heals, it will itch or peel. Resist the urge to scratch or pick at it, as it can cause scarring or pull out the ink. Instead, gently tap or slap the area to relieve the itch."
              : "Au fur et à mesure que votre tatouage guérit, il peut démanger ou peler. Résistez à l'envie de gratter ou de déterger, car cela peut causer des cicatrices ou retirer l'encre. Au lieu de cela, tapotez ou giflez doucement la zone pour soulager les démangeaisons."}
          </ListItem>
          <SmallTitles>
            {language === "en"
              ? "AVOID SHAVING THE AREA"
              : "ÉVITEZ DE RASER LA ZONE"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "Avoid shaving the area until it is fully healed. Shaving can irritate the skin and potentially damage the healing tattoo."
              : "Évitez de raser la zone jusqu'à ce qu'elle soit complètement guérie. Le rasage peut irriter la peau et potentiellement endommager le tatouage en guérison."}
          </ListItem>
          <SmallTitles>
            {language === "en"
              ? "AVOID SOAKING THE TATTOO"
              : "ÉVITEZ D'IMMERGER LE TATOUAGE"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "Avoid soaking the tattoo in water for long periods, as it can cause the ink to fade or the skin to become waterlogged."
              : "Évitez d'immerger le tatouage dans l'eau pendant de longues périodes, car cela peut estomper l'encre ou rendre la peau gorgée d'eau."}
          </ListItem>
          <SmallTitles>
            {language === "en"
              ? "AVOID EXPOSING TATTOO TO EXCESSIVE HEAT"
              : "ÉVITEZ D'EXPOSER LE TATOUAGE À UNE CHALEUR EXCESSIVE"}
          </SmallTitles>
          <ListItem>
            {language === "en"
              ? "Avoid exposing the tattoo to excessive heat, such as saunas, steam rooms, or the sun. Heat can cause the skin to swell and the tattoo to become irritated."
              : "Évitez d'exposer le tatouage à une chaleur excessive, comme les saunas, les hammams ou le soleil. La chaleur peut faire gonfler la peau et irriter le tatouage."}
          </ListItem>
        </UnorderedList>
        {isMobile && (
          <ImgWrapp>
            <OverLay />
            <Image src={aftercaretwo} />
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
  font-family: "noah-bold", sans-serif;
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
  padding-top: 60px;
  margin-bottom: 20vh;
  @media (min-width: 1000px) {
    padding: 0 10vw;
    top: 10vh;
    background-color: #bbabe8;
    gap: 10vh;
    padding-bottom: 10vh;
    padding-top: 0;
    align-items: center;
    margin-bottom: 10vh;
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
