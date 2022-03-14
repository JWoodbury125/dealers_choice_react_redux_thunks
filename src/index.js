import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      members: [],
      dues: [],
    };
  }
  render() {
    return (
      <div>
        <hr></hr>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
