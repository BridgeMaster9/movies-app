import { Component } from 'react'
import './tabs.css'

export default class Tabs extends Component {
  onClickRated = () => {
    this.props.getRatedList(1)
    this.props.changeMode('rated')
  }

  render() {
    const { mode, changeMode } = this.props

    const searchClass = mode === 'search' ? 'tabs__button tabs-checked' : 'tabs__button'
    const ratedClass = mode === 'rated' ? 'tabs__button tabs-checked' : 'tabs__button'

    return (
      <div className="tabs">
        <div className="tabs__container">
          <button className={searchClass} type="button" onClick={() => changeMode('search')}>
            Search
          </button>
          <button className={ratedClass} type="button" onClick={() => this.onClickRated()}>
            Rated
          </button>
        </div>
      </div>
    )
  }
}
