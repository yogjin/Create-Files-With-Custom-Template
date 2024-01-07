import { makefile } from '../utils/makeFile';

const storybookTemplate = (componentName: string) =>
  `import { Meta, StoryObj } from '@storybook/react';
import ${componentName} from './${componentName}';

const meta = {
  title: '${componentName}',
  component: ${componentName},
  args: {},
  argTypes: {},
  decorators: []
} satisfies Meta<typeof ModalPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
`;

export const createStorybookFile = (folderPath: string, componentName: string) => {
  const storybookContent = storybookTemplate(componentName);

  makefile(folderPath, `${componentName}.stories.tsx`, storybookContent);
};
