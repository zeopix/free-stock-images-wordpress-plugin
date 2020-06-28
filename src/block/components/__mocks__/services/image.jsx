
class MockImageService {
    constructor() {
        this.providers = [
            {
                name: 'providername',
                url: 'https://providername.com/api/?key=12345',
                paramQuery: 'q',
                paramPage: 'page'
            }
        ]
    }

    search (query, resolve, page=1, providerNames=[], per_page=10) {
        providerNames.map((providerName) => (
            resolve(providerName, [{url: 'https://imgur.to/500x400'}])
        ))
    }
}
export default MockImageService;
