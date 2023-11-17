import CardList from '../card-list'
import SearchPanel from '../search-panel'
import Tabs from '../tabs'
import RatedList from '../rated-list'
import MovieDBServices from '../../services/MovieDB-service'
import GuestSession from '../../services/GuestSession'
import PagePagination from '../page-pagination'
import RatedPagination from '../rated-pagination'
import AllGenres from '../../services/AllGenres'
import { GenresProvider } from '../../services/AllGenresContext'
import { debounce } from 'lodash'
import { Offline, Online } from 'react-detect-offline'
import { Spin, Alert } from 'antd'
import React from 'react'

import './app.css'

export default class App extends React.Component {
  movieDBServices = new MovieDBServices()

  guestSession = new GuestSession()

  allGenres = new AllGenres()

  state = {
    moviesListData: false,
    moviesListDataRated: false,
    loading: false,
    disconnect: false,
    notFound: false,
    totalPages: 1,
    ratedTotalPages: 1,
    movie: '',
    guestSessionID: '',
    mode: 'search',
    allGenres: null,
    ratedValues: [],
  }

  componentDidMount() {
    this.guestSession.getSessionId().then((id) => this.setState({ guestSessionID: id }))
    this.allGenres.getGenres().then((arr) => {
      this.setState({ allGenres: arr.genres })
    })
  }

  getData = (nameFilm, page = 1) => {
    this.setState({
      loading: true,
      disconnect: false,
      notFound: false,
    })
    this.movieDBServices.getPageMovies(nameFilm, page).then((res) => {
      if (res.moviesList === 'disconnect')
        this.setState({
          disconnect: true,
          loading: false,
          totalPages: 1,
        })
      if (res.moviesList === 'not found') {
        this.setState({
          notFound: true,
          loading: false,
          totalPages: 1,
        })
      } else {
        this.setState({
          moviesListData: res.moviesList,
          loading: false,
          totalPages: res.totalPages,
          movie: nameFilm,
          notFound: false,
        })
      }
    })
  }

  getDataHandler = debounce(this.getData, 500)

  setRatedCard = (movieID, stars) => {
    this.setState(({ ratedValues }) => {
      const Arr = [...ratedValues, stars]
      return { ratedValues: Arr }
    })
    this.guestSession.setRatedMovie(this.state.guestSessionID, movieID, stars)
  }

  changeMode = (tab) => {
    this.setState({ mode: tab })
  }

  getRatedListMovies = (page) => {
    this.setState({
      loading: true,
      disconnect: false,
      notFound: false,
    })
    this.guestSession.getRatedMovies(this.state.guestSessionID, page).then((res) => {
      console.log(res)
      this.setState({
        moviesListDataRated: res.moviesListRated,
        ratedTotalPages: res.ratedTotalPages,
        loading: false,
      })
    })
    this.setState({ loading: false, disconnect: false, notFound: false })
  }

  render() {
    const { moviesListData, loading, notFound, disconnect, totalPages } = this.state
    const { movie, guestSessionID, mode, moviesListDataRated, ratedValues } = this.state
    const { ratedTotalPages, allGenres } = this.state

    const spinner = loading ? <Spin size="large" /> : null
    const hasData = !(loading || notFound || disconnect || !moviesListData) ? (
      <CardList moviesListData={moviesListData} setRatedCard={this.setRatedCard} guestSessionID={guestSessionID} />
    ) : null
    const notFoundMessage = notFound ? <Alert message="По вашему запросу ответ не найден" type="warning" /> : null

    return (
      <div className="app">
        <div className="wrapper">
          <Tabs mode={mode} getRatedList={this.getRatedListMovies} changeMode={this.changeMode} />
          {mode === 'search' ? <SearchPanel onChangeMovie={this.getDataHandler} /> : null}
          <Online>
            <GenresProvider value={allGenres}>
              <>
                {spinner}
                {mode === 'search' ? hasData : null}
                {mode === 'rated' ? <RatedList listRated={moviesListDataRated} ratedValues={ratedValues} /> : null}
                {notFoundMessage}
              </>
            </GenresProvider>
          </Online>
          <Offline>
            <Alert message="Отсутствует интернет соединение" type="warning" />
          </Offline>
          {mode === 'search' ? <PagePagination totalPages={totalPages} movie={movie} getData={this.getData} /> : null}
          {mode === 'rated' ? (
            <RatedPagination totalPages={ratedTotalPages} getRatedList={this.getRatedListMovies} />
          ) : null}
        </div>
      </div>
    )
  }
}
