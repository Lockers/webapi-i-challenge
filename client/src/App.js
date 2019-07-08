import React from 'react';
import axios from 'axios';
import { User } from '../src/components/User';

class App extends React.Component {
  state = {
    users:[]
  }
  componentDidMount() {
   this.getUsers()
  }
  getUsers = () => {
    axios
      .get('http://localhost:8000/api/users/')
      .then(res => {
        const users = res.data;
        this.setState({ users })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map(user => { 
          return <User user={user} key={user.id} getUsers={this.getUsers} />
        })}
    </div>
    );
  }
}

export default App;
