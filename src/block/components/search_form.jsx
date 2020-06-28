import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import ImageService from './../services/image.jsx';
import SearchController from './../controllers/search.jsx';

/**
 * Search form component, sends query and selected providers to props instance of SearchController .
 */
class SearchForm extends React.Component {

    static propTypes = {
        /** Search controller for form-results interaction **/
        searchController: PropTypes.instanceOf(SearchController),
        /** Image service instance to bind params **/
        imageService: PropTypes.instanceOf(ImageService)
    }

    constructor(props) {
        super(props)
        this.state = props.searchController.state
    }

    componentDidMount() {
        this.props.searchController.subscribe((state) => this.setState(state))
    }

    render () {
        return (
            <React.Fragment>
                <TextField
                    onChange={(e) => this.props.searchController.setQuery(e.currentTarget.value)}
                    value={ this.state.query }
                    placeholder="Search for images"
                    className="searchInput"
                    />
                    <FormGroup row className="searchProviders">
                        {this.props.imageService.providers.map((provider) => (
                            <FormControlLabel
                                key={`provider-${provider.name}`}
                                control={
                                    this.state.loadingProviderNames.indexOf(provider.name) > -1 ?
                                        (
                                            <CircularProgress />
                                        ) : (
                                            <Checkbox
                                                checked={this.state.selectedProviderNames.indexOf(provider.name) > -1}
                                                onChange={() => this.props.searchController.toggleProvider(provider)}
                                                name={provider.name} />
                                        )
                                    }
                                label={provider.name}
                            />
                    ))}
                </FormGroup>
            </React.Fragment>
        )
    }
}
export default SearchForm;
