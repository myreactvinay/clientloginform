import React from "react";

class Users extends React.Component {

  state = {
    userdata: []
  }

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    fetch('http://localhost:8000/', {
        method: 'get'
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        if(data.success) {
          this.setState({userdata: data.data});
        }
      });
  }

  render() {
    return (
        <div><table>
                {this.state.userdata.map((value, key) => (
                  <tr key={key}>
                    <td >{value.name}</td>
                    <td >{value.email}</td>
                    <td >{value.role}</td>
                  </tr>
                ))}
</table>
        </div>
    );
  }

}

export default Users;