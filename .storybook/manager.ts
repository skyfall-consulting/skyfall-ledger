import { addons } from '@storybook/manager-api';
import skyfallLedgerTheme from './skyfallLedgerTheme';

addons.setConfig({
  theme: skyfallLedgerTheme,
  sidebar: {
    showRoots: true,
  },
});
