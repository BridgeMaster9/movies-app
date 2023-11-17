import { Component } from 'react'
import './search-panel.css'

export default class SearchPanel extends Component {
  state = {
    value: '',
  }

  onTaskChange = (event) => {
    this.props.onChangeMovie(event.target.value)
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <div className="search-panel">
        <input type="text" placeholder="Type to search.." onChange={this.onTaskChange} value={this.state.value} />
      </div>
    )
  }
}
