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
import Row from "./components/Row";
import useEventListener from "./hooks/useEventListener";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";
import { createDidYouMeanMessage } from "jest-validate/build/utils";
import { Hero } from "./components/Typography";

const useForceUpdate = () => useState()[1];

const Container = styled(Column)`
  background-color: #e5e5e5;
  padding: 4rem;
  margin: 0;
  height: 100vh;
`;

const Header = styled(Row)`
  height: 100px;
  color: blue;
`;

const Canvas = styled.canvas`
  position: absolute;
  opacity: ${(props) => props.opacity};
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

function App() {
  const imgEl = useRef(null);
  const canvasEl = useRef(null);
  const [data, setData] = useState([]);

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
        const rect = canvasEl.current.getBoundingClientRect();
        setData([...data, [clientX - rect.left, clientY - rect.top, 0.3]]);
      }
    },
    [setCoords, isSave, setData, data]
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

  const forceUpdate = useForceUpdate();

  return (
    <Container justify="flex-start">
      <Header>
        <Hero>Fake Heatmap</Hero> by <a href="https://www.loceye.io">Loceye</a>
      </Header>
      <HeatmapWrapper>
        <img
          alt="Background Media"
          ref={imgEl} // onLoad={this.updateImageDimensions}
          src={image}
          width="100%"
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
      {image === "" ? (
        <Dropzone handleImage={setImage} />
      ) : (
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
          <Button
            onClick={() => {
              setData([]);
            }}
          >
            Clear
          </Button>
          <Button onClick={() => setImage("")}>Reset</Button>
          <Button onClick={download}>Download</Button>
        </Controls>
      )}
    </Container>
  );
}

export default App;
