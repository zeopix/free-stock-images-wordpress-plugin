import ImageService from './../image.jsx';
import renderer from 'react-test-renderer';
import React from 'react';

global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve([{url: 'img1'}, {url: 'img2'}])
    })
  }
);

it('search resolves multiple providers', () => {

    const imageService = new ImageService([
        {
            name: 'providerA',
            url: 'testUrl',
            paramQuery: 'q',
            paramPage: 'page',
            transform: (rawImagesObject) => rawImagesObject
        },
        {
            name: 'providerB',
            url: 'testUrl',
            paramQuery: 'q',
            paramPage: 'page',
            transform: (rawImagesObject) => rawImagesObject
        }
    ])

    const expectResolve = (providerName, results) => {
        expect(['providerA', 'providerB']).toContain(providerName)
        expect(results).toStrictEqual([{url: 'img1'}, {url: 'img2'}])
    }

    imageService.search('query', expectResolve, 1, ['providerA', 'providerB'])
});
