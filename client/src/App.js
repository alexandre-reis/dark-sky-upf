import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MapContainer  from './MapContainer';
class App extends Component {
  constructor() {
    super();
    this.temperatures = [] ;
    this.state = {
      places: [],
      response: false,
      temperatures : [],
      endpoint: "http://localhost:8888"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);    
    socket.on("FromAPI", data => {
      console.log("passou aqui",data)      
      this.setState({places: data,temperatures: data })
    });
  }
  render() {
    const temperaturesResponse = this.state.temperatures.map(temp => {
      console.log("abc", temp);
    });
    return (
      <MapContainer places={this.state.places}/>
    );
  }
}
export default App;
