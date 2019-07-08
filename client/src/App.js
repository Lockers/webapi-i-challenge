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
      .get('http://localhost:8001/api/users/')
      .then(res => {
        const users = res.data;
        this.setState({ users })
      })
      .catch(err => {
        console.log(err)
      })
  }

  createUsers = (event) => {
    event.preventDefault()
    const name = event.target['name'].value
    const bio = event.target['bio'].value

    const newUser = {
      name,
      bio
    }
    axios
      .post('http://localhost:8001/api/users/', newUser)
    .then(this.getUsers())
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.createUsers}>
          <input
            type='text'
            name='name'
        />
          <input
            type='text'
            name='bio'
          />
        <button>Add User</button>
        </form>
        {this.state.users.map(user => { 
          return <User user={user} key={user.id} getUsers={this.getUsers} />
        })}
    </div>
    );
  }
}

export default App;
