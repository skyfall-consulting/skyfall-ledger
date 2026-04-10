// Storybook 8 ships manager-api re-exported from the @storybook/manager-api
// alias as well as via the meta `storybook` package. Using the @ scoped path
// keeps the import explicit and matches the Storybook 8 docs.
import { addons } from '@storybook/manager-api';
import skyfallLedgerTheme from './skyfallLedgerTheme';

addons.setConfig({
  theme: skyfallLedgerTheme,
  sidebar: {
    showRoots: true,
  },
});
