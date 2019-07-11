import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import Button from "./Button";
import Column from "./Column";
import Row from "./Row";

import { FiTrash2, FiDownloadCloud, FiRefreshCw } from "react-icons/fi";
import { Header2 } from "./Typography";

const Container = styled(Column)`
  padding: 1rem;

  width: 50%;
  @media only screen and (max-width: 60em) {
    width: 100%;
    min-width: 100%;
  }
`;

const SlidersContainer = styled(Column)`
  width: calc(100% - 1rem);
`;

const ButtonsContainer = styled(Row)`
  width: calc(100% - 1rem);
`;

const CustomSlider = styled(Slider)`
  && * {
    color: #212121;
  }
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
    <Container alignItems="flex-start">
      <Header2 weight="bold">Customize your heatmap:</Header2>
      <SlidersContainer>
        Opacity:
        <CustomSlider
          value={opacity}
          onChange={handleOpacity}
          aria-labelledby="opacity-slider"
          min={0.1}
          max={1}
          step={0.05}
        />
        Radius:
        <CustomSlider
          value={radius}
          onChange={handleRadius}
          aria-labelledby="opacity-slider"
          min={5}
          max={30}
          step={1}
        />
        Blur:
        <CustomSlider
          value={blur}
          onChange={handleBlur}
          aria-labelledby="opacity-slider"
          min={1}
          max={30}
          step={1}
        />
      </SlidersContainer>

      <ButtonsContainer justify="flex-end">
        <Button color="secondary" onClick={clearHeatmap}>
          <FiRefreshCw />
          Clear
        </Button>
        <Button color="secondary" onClick={deleteImage}>
          <FiTrash2 />
          Delete
        </Button>
        <Button color="primary" onClick={handleDownload}>
          <FiDownloadCloud />
          Download
        </Button>
      </ButtonsContainer>
    </Container>
  );
}

export default Controls;
