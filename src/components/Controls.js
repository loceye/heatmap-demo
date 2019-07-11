import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";

import Column from "./Column";

const Container = styled(Column)`
  width: 50%;
`;

const SlidersContainer = styled(Column)`
  width: 100%;
`;

const ButtonsContainer = styled(Column)`
  width: 100%;
`;

function Controls({
  opacity,
  radius,
  blur,
  handleOpacity,
  handleRadius,
  handleBlur,
  clearHeatmap,
  deleteImage,
  handleDownload,
}) {
  return (
    <Container>
      <SlidersContainer>
        Opacity:
        <Slider
          value={opacity}
          onChange={handleOpacity}
          aria-labelledby="opacity-slider"
          min={0.1}
          max={1}
          step={0.05}
        />
        Radius:
        <Slider
          value={radius}
          onChange={handleRadius}
          aria-labelledby="opacity-slider"
          min={5}
          max={30}
          step={1}
        />
        Blur:
        <Slider
          value={blur}
          onChange={handleBlur}
          aria-labelledby="opacity-slider"
          min={1}
          max={30}
          step={1}
        />
      </SlidersContainer>

      <ButtonsContainer>
        <Button onClick={clearHeatmap}>Clear Heatmap</Button>
        <Button onClick={deleteImage}>Upload other image</Button>
        <Button variant="contained" onClick={handleDownload}>
          Download
        </Button>
      </ButtonsContainer>
    </Container>
  );
}

export default Controls;
