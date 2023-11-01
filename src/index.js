import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.js'
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

class MywebsiteParent extends React.Component {
  render () {
    return (
      <div className='Cheem'>
        <App />
        {/* <h1>Hello Peter!</h1>
        <h3> {this.props.peterReaction}</h3> */}
      </div>
    )
  }
}

class MyWebsiteChild extends React.Component {
  render () {
    const Quote = "I'm a neighbourhood spider-man"
    return (
      <div>
        <MywebsiteParent peterReaction={Quote} />
        <p>
          {this.props.message} Call me {this.props.hint}
        </p>
      </div>
    )
  }
}

MyWebsiteChild.defaultProps = {
  message: "Hi I'm Spider-Man..",
  hint: 'Spidey :)'
}

class StateExample extends React.Component {
  constructor () {
    super() // readonly purpose of the super() to initialize the this.state value
    this.state = { initialValue: "Please don't give me", objective: 'Hope' }
  }
  changeValue = () => {
    const value = { name: "She's my" }
    this.setState({ initialValue: value.name }) // this.setState only know the state is change by the user/interacter so need to re-render and update the changed value
  }
  render () {
    return (
      <div>
        <MyWebsiteChild /> <br />
        <h1>
          {this.state.initialValue} {this.state.objective}
        </h1>
        <button
          style={{
            padding: '10px',
            margin: '3px',
            border: '0.5px solid yellow',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          type='button'
          onClick={this.changeValue}
        >
          Exit
        </button>
      </div>
    )
  }
}

// ReactDOM.render(<MyWebsiteChild hint="Cool Avenger!"/>, document.getElementById('root')); // when we gave value it will appear otherwise default will appear
ReactDOM.render(<MywebsiteParent />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
