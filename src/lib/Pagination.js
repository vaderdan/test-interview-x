import { observable } from 'mobx';
import _ from 'lodash'


class Pagination {
    
    @observable results = []
    @observable loading = false
    @observable haveMoreData = false
    @observable page = 0
    
    

    

    //mark: public methods

    startFetchingResults = () => {
        this.page = 0
        this.delegate.fetchResults(this.page, this._willFetchingResults, this._didFetchResults)
    }
    startRefreshingResults = () => {
        this.page = 0
        this.delegate.refreshResults(this.page, this._willFetchingResults, this._didFetchResults)
    }
    startFetchingNextResults = () => {
        if(this.loading || !this.haveMoreData) { return }

        this.page += 1
        this.delegate.fetchNextResults(this.page, this._willFetchingResults, this._didFetchNextResults)
    }

    //mark: private
    delegate = new PaginationDelegate

    _willFetchingResults = () => {
        this.loading = true
    }    

    _didFetchResults = (error, results, haveMoreData) => {
        if(error) {
            return _didFailedToFetchResults()
        }
        
        this.loading = false
        this.haveMoreData = haveMoreData
        
        
        this.delegate.endRefreshing(false)
        this.results.replace([]) //hack - to refresh observable    
        this.results.push(..._.toArray(results))
    }
    
    _didFetchNextResults = (error, results, haveMoreData) => {
        if(error) {
            return _didFailedToFetchResults()
        }

        this.loading = false
        this.haveMoreData = haveMoreData


        this.delegate.endRefreshing(false)
        this.results.push(..._.toArray(results))
    }
    
    _didFailedToFetchResults = () => {
        this.loading = false
        this.delegate.endRefreshing(true)
    }
}

// mark: Pagination delegate

class PaginationDelegate {
    fetchResults(page = 0, start = () => {}, finish = (error = new Error, result = [], haveMoreData = false) => {}) {}
    refreshResults(page = 0, start, finish = (error = new Error, result = [], haveMoreData = false) => {}) {}
    fetchNextResults(page = 0, start, finish = (error = new Error, result = [], haveMoreData = false) => {}) {}
    endRefreshing(hasError = false) {}
}

export default Pagination