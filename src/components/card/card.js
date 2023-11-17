import getColor from '../../services/get-color'
import { GenresConsumer } from '../../services/AllGenresContext'
import { Rate, Tag } from 'antd'
import React from 'react'

import './card.css'

export default class Card extends React.Component {
  onRatedCard(movieID, value) {
    this.props.setRatedCard(movieID, value)
  }

  render() {
    const { data, rating } = this.props
    const { title, posterPath, releaseDate, overview, movieID, genresIDs } = data
    let imgPoster
    if (posterPath) imgPoster = `https://image.tmdb.org/t/p/original${posterPath}`
    else imgPoster = 'https://m.media-amazon.com/images/S/sash/4FyxwxECzL-U1J8.png'
    const roundedRating = rating.toFixed(1)
    const color = getColor(rating)
    return (
      <div className="card">
        <div className="card__poster">
          <img className="card__image" alt="Poster" src={imgPoster} />
        </div>
        <div className="card__info">
          <div className="card__header">
            <span className="card__title">{title} </span>
            <div className="card__rating" style={{ borderColor: color }}>
              {roundedRating}
            </div>
          </div>
          <div className="card__date">{releaseDate}</div>
          <GenresConsumer>
            {(allGenres) => {
              console.log('genresIDs', genresIDs)
              const arr = []
              genresIDs.forEach((elem) => {
                allGenres.forEach((genre) => {
                  if (genre.id === elem) arr.push(<Tag key={genre.id}>{genre.name}</Tag>)
                })
              })
              return <div className="card__tags">{arr}</div>
            }}
          </GenresConsumer>
          <div className="card__description">{overview}</div>
          <Rate
            className="card_stars"
            count={10}
            defaultValue={0}
            onChange={(value) => {
              this.onRatedCard(movieID, value)
            }}
          />
        </div>
      </div>
    )
  }
}
