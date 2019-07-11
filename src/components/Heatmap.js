import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import simpleheat from "simpleheat";
import Row from "./Row";
import Controls from "./Controls";
import useEventListener from "../hooks/useEventListener";
import { darken } from "polished";
const SIMPLEHEAT_VALUE = 0.3;

const Container = styled(Row)`
  @media only screen and (max-width: 48em) {
    width: 100%;
    flex-direction: column;
  }
  @media only screen and (min-width: 48em) and (max-width: 60em) {
    width: 100%;
    flex-direction: column;
  }
  @media only screen and (min-width: 60em) and (max-width: 80em) {
    width: 100%;
  }
  @media only screen and (min-width: 80em) and (max-width: 100em) {
    width: 60%;
  }
  @media only screen and (min-width: 100em) {
    width: 50%;
  }

  background-color: ${darken(0.05, "#f2f4f6")};
  border-radius: 4px;
`;

const Canvas = styled.canvas`
  position: absolute;
  opacity: ${(props) => props.opacity};
  top: 1rem;
  left: 1rem;
  z-index: 10;
`;

const HeatmapContainer = styled.div`
  position: relative;
  width: 50%;
  @media only screen and (max-width: 60em) {
    width: 100%;
    min-width: 100%;
  }
  box-sizing: border-box;

  padding: 1rem;
`;

const Heatmap = ({ image, setImage }) => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.8);
  const [radius, setRadius] = useState(25);
  const [blur, setBlur] = useState(15);

  const handleOpacity = (event, newValue) => {
    setOpacity(newValue);
  };
  const handleRadius = (event, newValue) => {
    setRadius(newValue);
  };
  const handleBlur = (event, newValue) => {
    setBlur(newValue);
  };

  useEffect(() => {
    setWidth(imgRef.current.clientWidth);
    setHeight(imgRef.current.clientHeight);

    simpleheat(canvasRef.current)
      .data(data)
      .radius(radius, blur)
      .draw();
  }, [imgRef, canvasRef, data, radius, blur]);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      if (isClicked) {
        setCoords({ x: clientX, y: clientY });
        // Create data from mouse position
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        setData([...data, [x, y, SIMPLEHEAT_VALUE]]);
      }
    },
    [setCoords, isClicked, setData, data, canvasRef]
  );

  const handleMouseDown = useCallback(() => {
    setIsClicked(true);
  }, [setIsClicked]);

  const handleMouseUp = useCallback(() => {
    setIsClicked(false);
  }, [setIsClicked]);

  useEventListener("mousemove", handleMouseMove, canvasRef.current);
  useEventListener("mousedown", handleMouseDown, canvasRef.current);
  useEventListener("mouseup", handleMouseUp, canvasRef.current);

  const handleDownload = (event) => {
    let destCanvas = document.createElement("canvas");
    destCanvas.width = width;
    destCanvas.height = height;
    const destCtx = destCanvas.getContext("2d");

    const heatmap = canvasRef.current;
    const background = new Image();
    background.src = image;

    background.onload = function() {
      destCtx.drawImage(background, 0, 0, width, height);
      destCtx.drawImage(heatmap, 0, 0, width, height);

      const dataUrl = destCanvas.toDataURL("image/png");

      // Source: https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = dataUrl;
      // the filename you want
      a.download = "heatmap.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(dataUrl);
    };
  };
  const clearHeatmap = () => setData([]);
  const deleteImage = () => setImage("");

  return (
    <Container alignItems="flex-start">
      <HeatmapContainer>
        <img alt="Background Media" ref={imgRef} src={image} width="100%" />
        <Canvas
          ref={canvasRef}
          id="canvas"
          width={width}
          height={height}
          opacity={opacity}
        />
      </HeatmapContainer>

      <Controls
        opacity={opacity}
        radius={radius}
        blur={blur}
        handleOpacity={handleOpacity}
        handleRadius={handleRadius}
        handleBlur={handleBlur}
        clearHeatmap={clearHeatmap}
        deleteImage={deleteImage}
        handleDownload={handleDownload}
      />
    </Container>
  );
};

export default Heatmap;
