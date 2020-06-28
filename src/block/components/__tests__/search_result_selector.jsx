import SearchResultSelector from './../search_result_selector.jsx';
import renderer from 'react-test-renderer';
import React from 'react';

import SearchController from './../../controllers/search.jsx';
import MockImageService from './../__mocks__/services/image.jsx';

it('renders with query and sample provider', () => {
    const imageService = new MockImageService()
    const allProviderNames = imageService.providers.map((provider) => provider.name)
    const searchController = new SearchController('query', allProviderNames, [])
    const tree = renderer
        .create(<SearchResultSelector searchController={searchController} imageService={imageService} />)
        .toJSON();
  expect(tree).toMatchSnapshot();
});
