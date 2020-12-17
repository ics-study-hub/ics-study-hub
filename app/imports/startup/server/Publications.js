import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Leaderboards } from '../../api/leaderboard/Leaderboard';
import { UserInfo } from '../../api/userInfo/UserInfo';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin') === false) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Leaderboards.userPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin') === false) {
    return Leaderboards.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Leaderboards.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Leaderboards.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(UserInfo.userPublicationName, function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId });
  }
  return this.ready();
});

Meteor.publish(UserInfo.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInfo.collection.find();
  }
  return this.ready();
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: {
        'profile.firstname': 1,
        'profile.lastname': 1,
        'profile.points': 1,
        'profile.major': 1,
        'profile.grad_date': 1,
      },
    });
  }
  return this.ready();
});
