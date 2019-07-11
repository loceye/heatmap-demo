import React from "react";
import styled from "styled-components";
import Row from "./Row";
import Column from "./Column";
import { Body, Hero } from "./Typography";

const Container = styled(Column)`
  height: 100px;
  color: blue;
`;

const Header = () => (
  <Container>
    <Row>
      <Hero>Fake Heatmap</Hero> by <a href="https://www.loceye.io">Loceye</a>
    </Row>
    <Body>Click and drag your mouse to create magic</Body>
  </Container>
);

export default Header;
