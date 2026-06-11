import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';

import '@manti-ui/styles/index.css';
import './preview.css';

/** Drive the Manti UI theme from a Storybook toolbar toggle. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Manti UI theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    a11y: {
      context: 'body',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Foundations', 'Components', '*'],
      },
    },
  },
};

export default preview;
