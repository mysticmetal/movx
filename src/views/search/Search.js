import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';
import SearchMovieTab from './tab/SearchMovieTab';
import SearchTvTab from './tab/SearchTvTab';
import SearchPeopleTab from './tab/SearchPeopleTab';
import Tabs from '../../components/tabs/Tabs';

import { 
  search,
  updateSearchQuery
} from '../../actions/searchActions';

// helpers
import { numberWithCommas } from '../../helpers/helperFunctions';

class Search extends Component {
  componentDidMount() {
    const queryString = this.props.match.params.query;
    
    if (queryString !== this.props.query) {
      this.props.searchAll(queryString);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.props.searchAll(nextProps.match.params.query);
    }
  }

  render() {
    const { 
      movies, 
      tv, 
      people,
      query,
      totalFound,
      match, 
      isLoading 
    } = this.props;
    
    return (
      <>
        <div className="movie__header">
          <div className="movie__header-title">
            <h1>Search Result</h1>
            <h3>
            {numberWithCommas(totalFound)}&nbsp; 
              total result with keyword: &nbsp;
              <span className="result__keyword">
                {query}
              </span>
            </h3>
          </div>
        </div>
        <Tabs>
          <div 
              index={0}
              label={`Movies (${numberWithCommas(movies.total_results)})`}
          >
            <SearchMovieTab
                isLoading={isLoading} 
                movies={movies}
                query={match.params.query}
            />
          </div>
          <div 
              index={1}
              label={`TV Shows (${numberWithCommas(tv.total_results)})`}
          >
            <SearchTvTab 
                isLoading={isLoading} 
                query={match.params.query}
                tvShows={tv}
            />
          </div>
          <div 
              index={2}
              label={`People (${numberWithCommas(people.total_results)})`}
          >
            <SearchPeopleTab 
                isLoading={isLoading} 
                people={people}
                query={match.params.query}
            />
          </div>
        </Tabs>
      </>
    );
  }
}

Search.propTypes = {
  isLoading: PropTypes.bool, 
  movies: PropTypes.object, 
  people: PropTypes.object,
  totalFound: PropTypes.number,
  tv: PropTypes.object
};

const mapStateToProps = ({ _search, _misc }) => ({
  movies: _search.search.movies,
  tv: _search.search.tv,
  query: _search.search.query,
  people: _search.search.people,
  totalFound: (_search.search.movies.total_results + _search.search.tv.total_results + _search.search.people.total_results),
  isLoading: _misc.isLoading
});

const mapDispatchToProps = dispatch => ({
  searchAll: query => dispatch(search(query)),
  updateSearchQuery: query => dispatch(updateSearchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('movies')(Search));