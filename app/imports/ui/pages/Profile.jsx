import React from 'react';;
import UserProfile from '../components/UserProfile';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Profile extends React.Component {

  render() {
    return (
      <Header>
        <Item.Header as='a'>Welcome!</Item.Header>
      </Header>
    );
  }
}

export default Profile;
