import styled from "styled-components";
import Image from "next/image";
import {useRouter} from "next/router";
import StyledLink from "./StyledLink";
import Metamask from "../public/images/metamask.svg";
import MetamaskActive from "../public/images/metamask_filled.svg";
import Funds from "../public/images/funds.svg";
import Home from "../public/images/home.svg";
import Profile from "../public/images/profile.svg";
import Tasks from "../public/images/tasks.svg";
import {setGlobalState, useGlobalState} from "../state";

export default function Navbar() {
  const {pathname} = useRouter();
  const [popupState] = useGlobalState("openMMPopup");

  function openPopup() {
    setGlobalState("openMMPopup", true);
  }

  return (
    <>
      <StyledSection></StyledSection>

      <footer>
        <StyledList>
          <StyledDiv
            active={pathname === "/home" && popupState === false ? true : false}
          >
            <StyledLink href="/home">
              <Image alt="home" src={Home} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>
          <StyledDiv
            active={
              pathname === "/funds" && popupState === false ? true : false
            }
          >
            <StyledLink href="/funds">
              <Image alt="funds" src={Funds} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>

          <StyledButton onClick={() => openPopup()}>
            <Image
              alt="metamask"
              src={popupState ? MetamaskActive : Metamask}
              width="100px"
              height="100px"
            ></Image>
          </StyledButton>

          <StyledDiv
            active={
              pathname === "/tasks" && popupState === false ? true : false
            }
          >
            <StyledLink href="/tasks">
              <Image alt="tasks" src={Tasks} width="50px" height="50px"></Image>
            </StyledLink>
          </StyledDiv>
          <StyledDiv
            active={
              pathname === "/profile" && popupState === false ? true : false
            }
          >
            <StyledLink href="/profile">
              <Image
                alt="personal profile"
                src={Profile}
                width="50px"
                height="50px"
              ></Image>
            </StyledLink>
          </StyledDiv>
        </StyledList>
      </footer>
    </>
  );
}

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: rgba(165, 202, 210);
`;
const StyledSection = styled.section`
  margin-bottom: 20%;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  background-color: ${props =>
    props.active === true ? "rgba(255, 123, 137)" : ""};
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;
