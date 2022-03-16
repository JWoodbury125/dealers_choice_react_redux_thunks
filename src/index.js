import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      members: [],
    };
  }

  async componentDidMount() {
    const response = await axios.get("/members");
    this.setState({ members: response.data });
    console.log(this.state);
  }

  render() {
    const members = this.state.members;
    return (
      <div>
        <ul>
          {members.map((member) => {
            return (
              <li key={member.id}>
                {member.firstName} {member.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
