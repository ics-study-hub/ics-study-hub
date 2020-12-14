import { Selector } from 'testcafe';

class CreateSessionPage {
  constructor() {
    this.pageId = '#create-session';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that a session is successfully created */
  async createSession(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#create-name', 'John Doe');
    const reasonSelect = Selector('#create-reason');
    const reasonOption = reasonSelect.find('option');
    await testController.click(reasonSelect);
    await testController.click(reasonOption.withText('Questions'));
    const findGroupSelect = Selector('#create-findgroup');
    const findGroupOption = findGroupSelect.find('option');
    await testController.click(findGroupSelect);
    await testController.click(findGroupOption.withText('Yes'));
    await testController.typeText('#create-description', 'I have a question about my code for ICS 314');
  }
}

export const newSession = new CreateSessionPage();
