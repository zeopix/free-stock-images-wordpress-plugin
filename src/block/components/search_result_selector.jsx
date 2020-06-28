import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ImageService from './../services/image.jsx';
import SearchController from './../controllers/search.jsx';

import MockImageService from './__mocks__/services/image.jsx';
/**
 * Uses props instance of SearchController to fetch and show images from ImageService.
 */
class SearchResultSelector extends React.Component {

    static propTypes = {
        /** Search controller for form-results interaction **/
        searchController: PropTypes.instanceOf(SearchController),
        /** Image service to fetch results **/
        imageService: PropTypes.oneOfType([PropTypes.instanceOf(ImageService), PropTypes.instanceOf(MockImageService)]),
        /** Select result function **/
        selectResult: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            page: 1,
            results: [],
            selectedResult: null,
            query: props.searchController.state.query,
        }

        this.resolveResults = this.resolveResults.bind(this)
        this.requestResults = this.requestResults.bind(this)
        this.selectResult = this.selectResult.bind(this)
    }

    componentDidMount() {
        if (this.state.query.length > 0) {
            this.requestResults()
        }
        this.props.searchController.subscribe((state) => {
            if (this.state.query != state.query) {
                this.state.query = state.query
                this.state.results = []
                this.requestResults()
            }
        })
    }

    resolveResults (providerName, results) {
        const loadingProviderNames = this.props.searchController.state.loadingProviderNames;
        const providerIndex = loadingProviderNames.indexOf(providerName);
        if (providerIndex > -1) {
            loadingProviderNames.splice(providerIndex, 1)
        }
        this.props.searchController.setState({loadingProviderNames: loadingProviderNames})
        this.setState({
            isLoading: loadingProviderNames.length > 0,
            results: [...this.state.results, ...results]
        })
    }

    requestResults (newQuery = null) {
        if (!this.state.isLoading) {
            const query = newQuery == null ? this.state.query : newQuery;

            const requestedProviders = this.props.imageService.search(
                query,
                this.resolveResults,
                this.state.page,
                this.props.searchController.state.selectedProviderNames
            )

            this.setState({
                isLoading: true,
                page: this.state.page+1,
                query:query
            })

            this.props.searchController.setState({loadingProviderNames: requestedProviders})
        }

    }

    selectResult(result) {
        this.setState({selectedResult: result})
    }

    render () {
        if (this.state.results.length == 0) {
            return ('No results');
        }

        return (
            <React.Fragment>
                <Grid container className='searchResults'>
                    {[0,1,2].map((columnIndex) => (
                        <Grid item xs={4} key={`column_${columnIndex}`}>
                            {this.state.results.map((result, resultIndex) => (
                                (resultIndex % 3) == columnIndex ? (
                                    <img
                                        key={`column_${columnIndex}_${resultIndex}`}
                                        src={result.url} onClick={() => this.selectResult(result)}
                                        className={this.state.selectedResult && this.state.selectedResult.url == result.url ? 'selected image' : 'image'}
                                    />
                                ) : ''
                            ))}
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" size="large" onClick={this.requestResults} disabled={this.state.isLoading}>
                    Load More
                </Button>
                <Button variant="contained" size="large" color="primary" onClick={() => this.props.selectResult(this.state.selectedResult)}>
                    Save
                </Button>
            </React.Fragment>
        )
    }
}
export default SearchResultSelector;
