import Card from '../card'
import React from 'react'
import './card-list.css'

export default class CardList extends React.Component {
  render() {
    const { moviesListData, setRatedCard, guestSessionID } = this.props

    const elements = moviesListData.map((item, id) => (
      <Card
        key={id + 100}
        data={item}
        rating={item.rating}
        guestSessionID={guestSessionID}
        setRatedCard={setRatedCard}
      />
    ))
    return <ul className="card-list">{elements}</ul>
  }
}
