import { makefile } from 'utils/makeFile';

export const cssTemplate = () =>
  `import { css } from '@emotion/react';

export const Style = css({});
`;

export const createCSSFile = (folderPath: string, componentName: string) => {
  const cssContent = cssTemplate();

  makefile(folderPath, `${componentName}.style.ts`, cssContent);
};
