import React from 'react';

import addons from '@kadira/storybook-addons';

const ADDON_ID = 'storybook-addon-font-select';
const PANEL_ID = `${ADDON_ID}/font-panel`;

import App from './components';

addons.register(ADDON_ID, (api) => {
  const channel = addons.getChannel();

  addons.addPanel(PANEL_ID, {
    title: 'Fonts',
    render: () => (
      <App channel={channel} api={api} />
    ),
  });
});
