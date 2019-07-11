import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MUButton from "@material-ui/core/Button";
import { lighten } from "polished";

import {
  neutrals,
  errorAccent,
  warningAccent,
  primary,
  successAccent,
} from "../utils/colors";
import shadows from "../utils/shadows";

function getColor(color) {
  switch (color) {
    case "primary":
      return neutrals[900];
    case "secondary":
      return neutrals[100];
    case "tertiary":
      return primary[500];
    case "success":
      return successAccent[100];
    case "error":
      return errorAccent[500];
    case "info":
      return neutrals[100];
    case "warning":
      return warningAccent[100];
    default:
      return neutrals[900];
  }
}

function getBackgroundColor(color) {
  switch (color) {
    case "primary":
      return neutrals[100];
    case "secondary":
      return neutrals[800];
    case "tertiary":
      return primary[900];
    case "success":
      return successAccent[900];
    case "error":
      return errorAccent[900];
    case "info":
      return neutrals[800];
    case "warning":
      return warningAccent[900];
    default:
      return neutrals[100];
  }
}

function getHoverBackgroundColor(color) {
  switch (color) {
    case "primary":
      return neutrals[200];
    case "secondary":
      return neutrals[700];
    case "tertiary":
      return primary[800];
    case "success":
      return successAccent[800];
    case "error":
      return errorAccent[800];
    case "info":
      return neutrals[700];
    case "warning":
      return warningAccent[800];
    default:
      return neutrals[200];
  }
}

function getFocusBackgroundColor(color) {
  switch (color) {
    case "primary":
      return neutrals[300];
    case "secondary":
      return neutrals[600];
    case "tertiary":
      return primary[800];
    case "success":
      return successAccent[800];
    case "error":
      return errorAccent[800];
    case "info":
      return neutrals[600];
    case "warning":
      return warningAccent[800];
    default:
      return neutrals[300];
  }
}

const StyledButton = styled(({ color, iconRight, ...rest }) => (
  <MUButton {...rest} classes={{ disabled: "disabled" }} />
))`
  && {
    background-color: ${(props) => getBackgroundColor(props.color)};
    color: ${(props) => getColor(props.color)};
    text-transform: capitalize;
    border-radius: 4px;
    padding: 12px 21px;
    line-height: 21px;
    font-size: 1rem;
    box-shadow: ${shadows[0]};
    width: ${(props) => (props.fitContainer ? "100%" : "auto")};
  }

  svg {
    ${(props) =>
      props.iconRight ? ` margin-left: 0.5rem;` : ` margin-right: 0.5rem;`}
    width: 1rem;
    height: 1rem;
  }

  &&.disabled {
    background-color: ${neutrals[800]};
    color: ${neutrals[400]};
    cursor: not-allowed !important;
    svg {
      color: ${neutrals[400]};
    }
  }

  &&:focus {
    background-color: ${(props) => getFocusBackgroundColor(props.color)};
  }

  &&:active {
    background-color: ${(props) => getFocusBackgroundColor(props.color)};
  }

  &&:hover {
    background-color: ${(props) => getHoverBackgroundColor(props.color)};
  }
`;

const Button = ({
  children,
  iconRight,
  onClick,
  variant,
  isDisabled,
  color,
  fitContainer,
}) => {
  return (
    <StyledButton
      iconRight={iconRight}
      variant={variant}
      onClick={onClick}
      disabled={isDisabled}
      color={color}
      fitContainer={fitContainer}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["contained", "outlined", "text", "toggle"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary", "none"]),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  iconRight: PropTypes.bool,
  fitContainer: PropTypes.bool,
};

Button.defaultProps = {
  variant: "contained",
  color: "primary",
  isDisabled: false,
  onClick: () => {},
  children: null,
  iconRight: false,
  fitContainer: false,
};

export default Button;
