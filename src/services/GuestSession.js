import { Component } from 'react'

export default class GuestSession extends Component {
  state = {
    url: new URL('https://api.themoviedb.org'),
    apiKey: '9e934b46e305ebb4f07b132296befe37',
  }

  async getSessionId() {
    const url = new URL('3/authentication/guest_session/new', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch')
      const res = await response.json()
      return res.guest_session_id
    } catch (e) {
      throw new Error('ошибка создания гостевой сессии')
    }
  }

  async setRatedMovie(guestSessionId, movieID, stars) {
    const url = new URL(`3/movie/${movieID}/rating`, this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    url.searchParams.set('guest_session_id', guestSessionId)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ value: stars }),
      })
      if (!response.ok) throw new Error(`ошибка отправки оценки: url: ${url} statusText: ${response.statusText}`)
      const res = await response.json()
      return res
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async getRatedMovies(guestSessionId, page) {
    const url = new URL(`/3/guest_session/${guestSessionId}/rated/movies`, this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    url.searchParams.set('page', page)
    url.searchParams.set('sort_by', 'created_at.asc')
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Ошибка отправки запроса на получение оцененных фильмов')
      const res = await response.json()
      const moviesListRated = res.results.map((elem) => {
        const { title, release_date, overview, genre_ids, poster_path, id } = elem
        const overviewShort = this.toShortOverview(overview)
        const releaseDate = this.transformDate(release_date)
        return {
          title,
          releaseDate,
          genresIDs: genre_ids,
          overview: overviewShort,
          posterPath: poster_path,
          movieID: id,
        }
      })
      return { moviesListRated, ratedTotalPages: res.total_pages }
    } catch (e) {
      console.log('Ошибка получения оцененных фильмов', e)
      return { moviesListRated: [], ratedTotalPages: 1 }
    }
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
