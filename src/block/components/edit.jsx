import React from 'react';


import Button from '@material-ui/core/Button';
import BlockSave from './save.jsx';

import SearchController from './../controllers/search.jsx';
import ImageService from './../services/image.jsx';

import SearchForm from './search_form.jsx';
import SearchResultSelector from './search_result_selector.jsx';

class BlockEdit extends React.Component {

    constructor(props) {
        super(props)

        this.imageService = new ImageService;
        this.searchController = new SearchController(
            props.attributes.query,
            this.imageService.providers.map((provider) => provider.name)
        );

        this.state = { edit: false }

        this.saveResult = this.saveResult.bind(this)
        this.edit = this.edit.bind(this)
    }

    saveResult(result) {
        this.props.setAttributes({image: result.url })
        this.setState({edit: false})
    }

    edit() {
        this.setState({edit: true})
    }

    render () {
        if (this.props.attributes.image != '' && !this.state.edit) {
            return (
                <React.Fragment>
                    <BlockSave attributes={this.props.attributes} />
                    <Button onClick={this.edit}>Change</Button>
                </React.Fragment>
                );
        }
        return (
            <div className={this.props.className}>
                <SearchForm
                    searchController={this.searchController}
                    imageService={this.imageService}
                />

                <SearchResultSelector
                    searchController={this.searchController}
                    imageService={this.imageService}
                    selectResult={this.saveResult}
                />

            </div>
        )
    }
}
export default BlockEdit;
