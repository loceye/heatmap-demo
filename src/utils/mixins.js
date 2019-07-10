import { css } from 'styled-components';

export const spacingVerticalMixin = css`
  && > * {
    margin-bottom: 1rem;
    margin-bottom: ${(props) => props.spacing}rem;
  }
  && > *:last-child {
    margin-bottom: 0;
  }
`;

export const spacingHorizontalMixin = css`
  && > * {
    margin-right: 1rem;
    margin-right: ${(props) => props.spacing}rem;
  }
  && > *:last-child {
    margin-right: 0;
  }
`;

export const oneLineText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
