import React, { useState } from "react";
import styled from "styled-components";

import Column from "./components/Column";
import Dropzone from "./components/Dropzone";
import Header from "./components/Header";
import Heatmap from "./components/Heatmap";

const Container = styled(Column)`
  background-color: #e5e5e5;
  padding: 4rem;
  margin: 0;
  height: 100vh;
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

export default App;
