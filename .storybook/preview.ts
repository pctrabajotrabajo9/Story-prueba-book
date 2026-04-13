import type { Preview } from '@storybook/web-components';

import '../src/styles/beo-tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark',  value: '#1a1a2e'  },
        { name: 'gray',  value: '#f5f5f5'  },
      ],
    },
  },
};

export default preview;
