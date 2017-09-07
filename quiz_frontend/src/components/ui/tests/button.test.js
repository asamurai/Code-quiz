import React from 'react';
import { Button } from '../index.js';
import renderer from 'react-test-renderer';

it('Button title renders correctly', () => {
  const buttonDefaultTitle = renderer.create(
    <Button/>
  ).toJSON();
  expect(buttonDefaultTitle).toMatchSnapshot();

  const buttonCustomTitle = renderer.create(
    <Button
        title="subscribe"
    />
  ).toJSON();
  expect(buttonCustomTitle).toMatchSnapshot();
});
