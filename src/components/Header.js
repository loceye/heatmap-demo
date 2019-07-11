import React from "react";
import styled from "styled-components";
import Row from "./Row";
import Column from "./Column";
import { Body, Hero } from "./Typography";

const Container = styled(Column)`
  height: 100px;
  a {
    color: #212121;
  }
`;

const Header = () => (
  <Container>
    <Row alignItems="flex-end">
      <Hero weight="bold">Fake Heatmap</Hero> by{" "}
      <a href="https://www.loceye.io">Loceye</a>
    </Row>
    <Body>Click and drag your mouse to create magic</Body>
  </Container>
);

export default Header;
