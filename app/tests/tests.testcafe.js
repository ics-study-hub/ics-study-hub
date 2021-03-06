import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { newSession } from './createsession.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup work', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, 'JohnDoe@foo.com', 'changeme', 'John', 'Doe', 'ICS', '2022');
  await navBar.isLoggedIn(testController, 'JohnDoe@foo.com');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the List Stuff page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await testController.click('#list-stuff');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Calendar page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await testController.click('#usercalendar');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the leaderboards page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await testController.click('#list-leaderboard');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the create sessions page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await testController.click('#create-session');
  await newSession.createSession(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the admin', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);
  await testController.click('#admincalendar');
  await testController.click('#adminsession');
  await testController.click('#adminleaderboard');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
