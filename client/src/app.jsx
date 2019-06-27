import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: this.props.id
    }

  }
  
  updateForm(e) {
    // this.setState({})
    console.log(e.target)
  }

  fetch() {
    $.ajax({
      url: `${this.state.id}`,
      type: 'GET',
      success: (data) => {
        //finish this, show the data in a basic box/div
        console.log(data);
        // this.setState({})
      }
    })
  }

  render() {
    return(
    <div>
      {this.state.id}
    </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));