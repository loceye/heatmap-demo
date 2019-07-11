import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import styled from "styled-components";

import Column from "./components/Column";
import Dropzone from "./components/Dropzone";
import Header from "./components/Header";
import Heatmap from "./components/Heatmap";

const Container = styled(Column)`
  background-color: #f2f4f6;
  color: #212121;
  padding: 4rem;
  margin: 0;
  min-height: 100vh;

  * {
    font-family: "Work Sans", sans-serif;
  }
`;

function App() {
  const [image, setImage] = useState("");
  const hasImage = image !== "";

  return (
    <Container justify="flex-start">
      <Header />
      {hasImage ? (
        <Heatmap image={image} setImage={setImage} />
      ) : (
        <Dropzone handleImage={setImage} />
      )}
    </Container>
  );
}

export default hot(App);
