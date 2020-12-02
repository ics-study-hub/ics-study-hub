import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
import {LongTextField, SelectField, SubmitField, TextField} from "uniforms-semantic";
import {Segment} from "semantic-ui-react";
import React from "react";

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
    await testController.click(reasonOption.withText('Help'));
    await testController.typeText('#create-time', '3:00 pm');
    await testController.typeText('#create-date', '12/5/2020');
    const findGroupSelect = Selector('#create-findgroup');
    const findGroupOption = findGroupSelect.find('option');
    await testController.click(findGroupSelect);
    await testController.click(findGroupOption.withText('yes'));
    await testController.typeText('#create-description', 'Help me build this website please');
  }
}

export const newSession = new CreateSessionPage();
