import type { StorybookConfig } from '@storybook/web-components-vite';
import { fileURLToPath, URL } from 'node:url';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.ts',
    '../src/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@atoms':      fileURLToPath(new URL('../src/stories/atoms',     import.meta.url)),
      '@molecules':  fileURLToPath(new URL('../src/stories/molecules', import.meta.url)),
      '@organisms':  fileURLToPath(new URL('../src/stories/organisms', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('../src/interfaces',        import.meta.url)),
      '@helper':     fileURLToPath(new URL('../src/helper',            import.meta.url)),
      '@utils':      fileURLToPath(new URL('../src/utils',             import.meta.url)),
      '@styles':     fileURLToPath(new URL('../src/styles',            import.meta.url)),
      '@enums':      fileURLToPath(new URL('../src/enums',             import.meta.url)),
      '@assets':     fileURLToPath(new URL('../src/assets',            import.meta.url)),
    };
    return config;
  },
};

export default config;
