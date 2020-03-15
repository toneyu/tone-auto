import { Header, Text } from 'grommet';
import React from 'react';
import AccentureLogo from '../assets/accenture.png';
import Minecraft from '../assets/minecraft.jpg';

const HeaderContainer = () => (
  <Header>
    <img src={AccentureLogo} height={50} alt="accenture-logo" />
    <Text>Automation</Text>
    <img src={Minecraft} height={50} alt="accenture-logo" />
  </Header>
);

export default HeaderContainer;
