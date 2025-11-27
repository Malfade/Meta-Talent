/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(async () => {
  const config = {
    plugins: [react()],
  };

  if (process.env.VITEST === 'true') {
    const { storybookTest } = await import('@storybook/addon-vitest/vitest-plugin');
    const { playwright } = await import('@vitest/browser-playwright');

    Object.assign(config, {
      test: {
        projects: [
          {
            extends: true,
            plugins: [
              storybookTest({
                configDir: path.join(dirname, '.storybook'),
              }),
            ],
            test: {
              name: 'storybook',
              browser: {
                enabled: true,
                headless: true,
                provider: playwright({}),
                instances: [{ browser: 'chromium' }],
              },
              setupFiles: ['.storybook/vitest.setup.ts'],
            },
          },
        ],
      },
    });
  }

  return config;
});