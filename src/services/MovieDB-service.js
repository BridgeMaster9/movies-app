import { Component } from 'react'

export default class MovieDBServices extends Component {
  state = {
    url: new URL('https://api.themoviedb.org'),
    apiKey: '9e934b46e305ebb4f07b132296befe37',
  }

  async getRequest(movieName, page) {
    const url = new URL('3/search/movie', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    url.searchParams.set('query', movieName)
    url.searchParams.set('page', page)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        return 'not found'
      }
      return await response.json()
    } catch (error) {
      return 'disconnect'
    }
  }

  async getPageMovies(movieName, page) {
    const res = await this.getRequest(movieName, page)
    if (res === 'disconnect') return { moviesList: 'disconnect', totalPages: 1 }
    if (!res.results.length || res === 'not found') {
      return { moviesList: 'not found', totalPages: 1 }
    }
    const moviesList = res.results.map((elem) => {
      const { title, release_date, overview, genre_ids, poster_path, id, vote_average } = elem
      const overviewShort = this.toShortOverview(overview)
      const releaseDate = this.transformDate(release_date)
      return {
        title,
        releaseDate,
        genresIDs: genre_ids,
        overview: overviewShort,
        posterPath: poster_path,
        movieID: id,
        rating: vote_average,
      }
    })
    return { moviesList, totalPages: res.total_pages }
  }

  toShortOverview(str) {
    const arr = str.split(' ')
    if (arr.length > 30) return `${arr.slice(0, 30).join(' ')}...`
    return str
  }

  transformDate = function (date) {
    const arrDate = date.split('-')
    const arrMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    return `${arrMonth[arrDate[1] - 0]} ${arrDate[2]}, ${arrDate[0]}`
  }
}
