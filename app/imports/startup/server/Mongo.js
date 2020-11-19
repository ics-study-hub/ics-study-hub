import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Leaderboards } from '../../api/leaderboard/Leaderboards';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addLeaderboard(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Leaderboards.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the collection if empty. */
if (Leaderboards.collection.find().count() === 0) {
  if (Meteor.settings.defaultLeaderboards) {
    console.log('Creating default data.');
    Meteor.settings.defaultLeaderboards.map(data => addLeaderboard(data));
  }
}
