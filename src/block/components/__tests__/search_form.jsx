import SearchForm from './../search_form.jsx';
import renderer from 'react-test-renderer';
import React from 'react';

import SearchController from './../../controllers/search.jsx';
import ImageService from './../../services/image.jsx';

it('renders with query and three providers', () => {
    const imageService = new ImageService()
    const allProviderNames = imageService.providers.map((provider) => provider.name)
    const searchController = new SearchController('query', allProviderNames, [])
    const tree = renderer
        .create(<SearchForm searchController={searchController} imageService={imageService} />)
        .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with query, three providers and one provider loading', () => {
    const imageService = new ImageService()
    const allProviderNames = imageService.providers.map((provider) => provider.name)
    const loadingProviderNames = [imageService.providers[0].name]
    const searchController = new SearchController('query', allProviderNames, loadingProviderNames)
    const tree = renderer
        .create(<SearchForm searchController={searchController} imageService={imageService} />)
        .toJSON();
  expect(tree).toMatchSnapshot();
});
