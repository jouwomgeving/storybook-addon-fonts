import React from 'react';
import { storiesOf } from '@kadira/storybook';

import withFonts from './../../../src';

import Button from './component';

import Faker from 'faker';

const text = Faker.lorem.words();

storiesOf('<Button />', module)
  .addDecorator(withFonts)
  .add('Default', () => (
    <Button />
  ))
  .add('Content', () => (
    <Button content={text} />
  ))
  .add('Label', () => (
    <Button label={text} />
  ))
  .add('Disabled', () => (
    <Button
      disabled
      content={text}
    />
  ))
  .add('Invalid contrast', () => (
    <Button
      contrast="wrong"
      content={Faker.lorem.words()}
    />
  ));
