# storybook-addon-fonts [![npm version][npm-image]][npm-url]

Storybook addon to decorate you're stories with custom font families.

Only system and google fonts are supported for now.

## Getting started

First, install the addon.

```shell
$ npm install -D @jouwomgeving/storybook-addon-fonts
```

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-fonts/register';
```

import the `'withFonts'` decorator to check you're stories for violations within your components.

```js
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import withFonts from 'storybook-addon-fonts';

storiesOf('button', module)
  .addDecorator(withFonts)
  .add('Accessible', () => (
    <button>
      Lorem ipsum
    </button>
  ));
```

[npm-image]: https://img.shields.io/npm/v/@jouwomgeving/storybook-addon-fonts.svg
[npm-url]: https://www.npmjs.com/package/@jouwomgeving/storybook-addon-fonts
