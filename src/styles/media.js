export const mediaQuery = (maxWidth) => `
  @media (max-width: ${maxWidth}px)
`;

export default {
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1200),
  medium: mediaQuery(1024),
  small: mediaQuery(480),
  xsmall: mediaQuery(320),
  custom: mediaQuery,
};
