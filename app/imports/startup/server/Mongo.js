import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Leaderboards } from '../../api/leaderboard/Leaderboard';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding to sessions: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addLeaderboard(data) {
  console.log(`  Adding leaderboard: ${data.name} (${data.owner})`);
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
    console.log('Creating default leaderboard.');
    Meteor.settings.defaultLeaderboards.map(data => addLeaderboard(data));
  }
}

/** Initialize created sessions and leaderboard data from data.json */
if ((Stuffs.collection.find().count() < 3) && (Leaderboards.collection.find().count() < 3)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.sessions.map(sessions => addData(sessions));
  jsonData.leaderboard.map(leaderboard => addLeaderboard(leaderboard));
}
