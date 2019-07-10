import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createElement,
} from "react";
import styled from "styled-components";
import simpleheat from "simpleheat";
import Dropzone from "./components/Dropzone";
import Column from "./components/Column";
import useEventListener from "./hooks/useEventListener";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";
import { createDidYouMeanMessage } from "jest-validate/build/utils";

const Canvas = styled.canvas`
  position: absolute;
  opacity: ${(props) => props.opacity || "1"};
  top: 0;
  left: 0;
  z-index: 10;
`;

const HeatmapWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Controls = styled(Column)`
  width: 50%;
`;

let data = [];

function App() {
  const imgEl = useRef(null);
  const canvasEl = useRef(null);

  const [image, setImage] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [opacity, setOpacity] = useState(0.8);
  const handleOpacity = (event, newValue) => {
    setOpacity(newValue);
  };
  const [radius, setRadius] = useState(25);
  const handleRadius = (event, newValue) => {
    setRadius(newValue);
  };
  const [blur, setBlur] = useState(15);
  const handleBlur = (event, newValue) => {
    setBlur(newValue);
  };

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setWidth(imgEl.current.clientWidth);
    setHeight(imgEl.current.clientHeight);

    simpleheat(canvasEl.current)
      .data(data)
      .radius(radius, blur)
      .draw();
  });

  const [isSave, setIsSave] = useState(false);

  const handler = useCallback(
    ({ clientX, clientY }) => {
      if (isSave) {
        setCoords({ x: clientX, y: clientY });
        data = [...data, [clientX, clientY, 0.3]];
      }
    },
    [setCoords, isSave]
  );

  const handlerMouseDown = useCallback(() => {
    setIsSave(true);
    console.log("here");
  }, [setIsSave]);
  const handlerMouseUp = useCallback(() => {
    setIsSave(false);
  }, [setIsSave]);

  // Add event listener using our hook
  useEventListener("mousemove", handler, canvasEl.current);
  useEventListener("mousedown", handlerMouseDown, canvasEl.current);
  useEventListener("mouseup", handlerMouseUp, canvasEl.current);

  const download = (event) => {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const destCtx = canvas.getContext("2d");

    const heatmap = canvasEl.current;
    const background = new Image();
    background.src = image;

    background.onload = function() {
      console.log("loaded");

      destCtx.drawImage(background, 0, 0, width, height);
      destCtx.drawImage(heatmap, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/png");

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

  return (
    <div className="App">
      <HeatmapWrapper>
        <img
          alt="Background Media"
          ref={imgEl} // onLoad={this.updateImageDimensions}
          src={image}
        />
        <Canvas
          ref={canvasEl}
          id="canvas"
          width={width}
          height={height}
          // innerRef={(ref) => (this.canvas = ref)}
          opacity={opacity}
        />
      </HeatmapWrapper>
      <Dropzone handleImage={setImage} />

      <Controls>
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
      </Controls>

      <Button onClick={download}>Download</Button>
    </div>
  );
}

export default App;
