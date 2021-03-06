import React, { Component } from 'react';
import HotelList from './HotelList';
import withScrollPosition from '../../Components/Utils/withScrollPostion';
import CarouselSLiding from '../../Components/CarouselSliding';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import constants from '../../utils/constants';

const TopMargin = styled.div`
  padding-top: 8rem;
`;

class HotelListContainer extends Component {
  componentDidMount() {
    if (this.props.tiles.status !== constants.SUCCESS) {
      this.props.fetchTiles();
    }
    if (this.props.tiles.cities !== constants.SUCCESS) {
      this.props.fetchCities();
    }
    if (this.props.hotels.status !== constants.SUCCESS) {
      const { page } = this.props.hotels;
      this.props.fetchHotels({ ...this.props.filters, page });
    }
  }

  loadMore = () => {
    const { page, pages } = this.props.hotels;
    // pages - number of pages of data on server
    // page - current client page
    if (page <= pages) {
      //check wheter there are any data to fetch
      this.props.fetchMoreHotels({ ...this.props.filters, page });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.props.hotels;
    if (this.props.filters !== prevProps.filters) {
      //fetch hotels when filters change
      this.props.fetchHotels({ ...this.props.filters, page });
    }
    if (this.props.scrollInfo && prevProps.scrollInfo) {
      const { scrollY, innerHeight, scrollHeight } = this.props.scrollInfo;

      const scrollPos = scrollHeight - scrollY - innerHeight;
      if (
        scrollPos < innerHeight &&
        scrollY > 0 &&
        scrollHeight === prevProps.scrollInfo.scrollHeight &&
        scrollY !== prevProps.scrollInfo.scrollY
      ) {
        //load more hotels when user scrolled to bottom
        this.loadMore();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.filters) {
      this.props.removeFilters();
    }
  }

  selectCityFilter = city => {
    this.props.addFilters({ city });
  };

  render() {
    const { status } = this.props.hotels;
    if (status === 'FAILURE') {
      return 'Error: Cannot load rooms';
    }
    return (
      <TopMargin>
        {this.props.tiles.status === constants.SUCCESS && (
          <CarouselSLiding
            items={this.props.tiles.list}
            onClick={this.selectCityFilter}
          />
        )}
        <HotelList
          loadmore={this.loadMore}
          hotels={this.props.hotels.list}
          cities={this.props.cities.list}
          loading={this.props.hotels.status === constants.LOADING}
        />
      </TopMargin>
    );
  }
}

const mapStateToProps = state => {
  return {
    hotels: state.hotels,
    filters: state.filters,
    tiles: state.tiles,
    cities: state.cities
  };
};

export default withScrollPosition(
  connect(
    mapStateToProps,
    actions
  )(HotelListContainer)
);
