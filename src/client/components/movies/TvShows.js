import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import MovieCard from '../card/MovieCard';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

const queryString = 'discover/tv?&language=en-US&sort_by=popularity.desc&timezone=America%2FNew_York';

class TvShows extends Component {
  state = {
    sortBy: 'popularity.desc'
  };

  componentDidMount() {
    if (this.isEmpty(this.props.tvShows))
      this.props.fetchRequest('FETCH_TV_SHOWS', queryString);
  }

  handlePageChange = (e) => {
    if (this.props.tvShows.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TV_SHOWS', queryString, e);
    }
  };

  isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  render() {
    const { tvShows, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        <div className="container">
          <div className="container__wrapper">
            <div className="movie__header">
              <h1>TV Shows</h1>
            </div>
            <div className="movie__wrapper">
              {tvShows.collection && tvShows.collection.map((show) => {
                return (
                  <MovieCard 
                      key={show.id}
                      category="tv"
                      movie={show} 
                  />
                )
              })}
            </div>
            {tvShows.collection && (
              <div className="pagination__wrapper">
                <p>Page {tvShows.activePage}/{tvShows.total_pages}</p>
                <Pagination
                    activePage={tvShows.activePage || 1}
                    firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                    itemsCountPerPage={10}
                    lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                    nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={5}
                    prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                    totalItemsCount={tvShows.total_pages || 1000}
                />
              </div>
            )}
          </div>    
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ tvShows, isLoading }) => ({
  tvShows,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);