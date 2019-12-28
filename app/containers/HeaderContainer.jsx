import { Header } from 'grommet';
import React from 'react';
import styled from 'styled-components';
import AccentureLogo from '../assets/accenture.png';
import Minecraft from '../assets/minecraft.jpg';
import Status from './Status';

const StyledStatus = styled(Status)``;

const HeaderContainer = () => (
  <Header>
    <img src={AccentureLogo} height={50} alt="accenture-logo" />
    <StyledStatus />
    <img src={Minecraft} height={50} alt="accenture-logo" />
  </Header>
);

export default HeaderContainer;
