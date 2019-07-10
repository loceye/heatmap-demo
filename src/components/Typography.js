import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../utils/theme";

const { neutrals, primary, errorAccent, warningAccent, successAccent } = colors;

function getColor(color) {
  switch (color) {
    case "primary":
      return neutrals[100];
    case "secondary":
      return neutrals[500];
    case "tertiaty":
      return primary[500];
    case "success":
      return successAccent[300];
    case "error":
      return errorAccent[500];
    case "info":
      return neutrals[100];
    case "warning":
      return warningAccent[100];
    case "white":
      return "fff";
    default:
      return neutrals[100];
  }
}

export const Hero = styled.p`
  font-family: Rubik;
  font-size: 42.7px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Hero.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Hero.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Header1 = styled.h1`
  font-family: Rubik;
  font-size: 34.2px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Header1.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Header1.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Header2 = styled.h2`
  font-family: Rubik;
  font-size: 27.3px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Header2.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Header2.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Header3 = styled.h3`
  font-family: Rubik;
  font-size: 21.88px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Header3.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Header3.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Header4 = styled.h4`
  font-family: Rubik;
  font-size: 17.5px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Header4.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Header4.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Body = styled.p`
  font-family: Rubik;
  font-size: 14px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Body.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Body.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const SmallBody = styled.p`
  font-family: Rubik;
  font-size: 11.2px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

SmallBody.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

SmallBody.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};

export const Uppercase = styled.p`
  font-family: Rubik;
  font-size: 14px;
  font-weight: ${(props) => props.weight};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: ${(props) => props.align};
  color: ${(props) => getColor(props.color)};
  margin: 0;
`;

Uppercase.propTypes = {
  weight: PropTypes.oneOf(["normal", "bold", "italic"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "success",
    "error",
    "warning",
    "info",
    "white",
  ]),
  align: PropTypes.oneOf(["center", "left", "center", "justify"]),
};

Uppercase.defaultProps = {
  weight: "normal",
  color: "primary",
  align: "left",
};
