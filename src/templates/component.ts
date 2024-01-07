import { makefile } from 'utils/makeFile';

export const componentTemplate = (componentName: string) =>
  `type Props = {};

const ${componentName} = ({}: Props) => {
    return <></>;
};

export default ${componentName};
`;

export const createComponentFile = (folderPath: string, componentName: string) => {
  const componentContent = componentTemplate(componentName);

  makefile(folderPath, `${componentName}.tsx`, componentContent);
};
