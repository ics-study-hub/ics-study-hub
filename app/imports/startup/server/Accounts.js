import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role, firstname, lastname, points, major, grad_date) {
  console.log(`  Creating user ${email}.`);
  let userPoints = 0;
  if (points) { userPoints = points; }
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstname: firstname,
      lastname: lastname,
      points: userPoints,
      major: major,
      grad_date: grad_date,
    },
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstname, lastname, points, major, grad_date }) => createUser(email, password, role, firstname, lastname, points, major, grad_date));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
  console.log(`User Count: ${Meteor.users.find().count()}`);
}

/** Initialize user data from data.json */
if ((Meteor.users.find().count() <= 2)) {
  console.log('Getting additional users.');
  const assetsFileName = 'data.json';
  console.log(`Loading user data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.accounts.map(({ email, password, role, firstname, lastname, points }) => createUser(email, password, role, firstname, lastname, points));
  console.log(`User Count: ${Meteor.users.find().count()}`);
}
