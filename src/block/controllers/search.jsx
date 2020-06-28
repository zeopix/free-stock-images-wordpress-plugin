
import { BehaviorSubject } from 'rxjs';


class SearchController  {

    stateSubscriber = new BehaviorSubject('');
    stateListener = new BehaviorSubject('');

    state = {
        query: '',
        selectedProviderNames: [],
        loadingProviderNames: [],
    }

    constructor (query = '', selectedProviderNames = [], loadingProviderNames = []) {
        this.state.query = query;
        this.state.selectedProviderNames = selectedProviderNames
        this.state.loadingProviderNames = loadingProviderNames
        this.stateListener.subscribe(this.bindStateListener.bind(this))
        this.setQuery = this.setQuery.bind(this)
    }

    bindStateListener (state = {}) {
        this.state.query = state.query ? state.query : this.state.query;
        this.state.selectedProviderNames = state.selectedProviderNames ? state.selectedProviderNames : this.state.selectedProviderNames;
        this.state.loadingProviderNames = state.loadingProviderNames ? state.loadingProviderNames : this.state.loadingProviderNames;

        this.stateSubscriber.next(this.state)
    }


    toggleProvider(provider) {
        const selectedProviderNames = this.state.selectedProviderNames;
        const providerIndex = selectedProviderNames.indexOf(provider.name);
        if (providerIndex > -1) {
            selectedProviderNames.splice(providerIndex, 1)
        } else {
            selectedProviderNames.push(provider.name)
        }
        this.setState({selectedProviderNames: selectedProviderNames})
    }

    setQuery (query) {
        if (query != this.state.query ) {
            this.setState({query: query})
        }
    }

    setState(state) {
        this.stateListener.next(state)
    }

    subscribe(resolve) {
        this.stateSubscriber.subscribe(resolve)
    }

}
export default SearchController;
