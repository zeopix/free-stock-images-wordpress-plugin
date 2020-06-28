import BlockSave from './../save.jsx';
import renderer from 'react-test-renderer';
import React from 'react';

it('renders correctly', () => {
  const tree = renderer
    .create(<BlockSave attributes={{image: 'sample_image'}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
