import Card from '../card'
import React, { Component } from 'react'

export default class RatedList extends Component {
  render() {
    const { listRated, ratedValues } = this.props
    let elements
    if (listRated && listRated.length > 0) {
      elements = listRated.map((item, id) => <Card key={id + 1000} rating={ratedValues[id]} data={item} />)
    }

    return <ul className="card-list">{elements || null}</ul>
  }
}
