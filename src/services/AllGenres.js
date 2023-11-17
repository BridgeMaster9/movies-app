import { Component } from 'react'

export default class AllGenres extends Component {
  state = {
    url: new URL('https://api.themoviedb.org'),
    apiKey: '9e934b46e305ebb4f07b132296befe37',
  }

  async getGenres() {
    const url = new URL('3/genre/movie/list', this.state.url)
    url.searchParams.set('api_key', this.state.apiKey)
    try {
      const response = await fetch(url)
      const res = await response.json()
      return res
    } catch (e) {
      return false
    }
  }
}
