import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class StuffsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StuffsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      className: {
        type: String,
        allowedValues: ['ICS 101', 'ICS 102', 'ICS 103', 'ICS 110', 'ICS 111', 'ICS 141', 'ICS 210',
          'ICS 211', 'ICS 212', 'ICS 215', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 290', 'ICS 311', 'ICS 312',
          'ICS 313', 'ICS 314', 'ICS 321', 'ICS 331', 'ICS 332', 'ICS 351', 'ICS 355',
          'ICS 361', 'ICS 390', 'ICS 414', 'ICS 415', 'ICS 419', 'ICS 421', 'ICS 422',
          'ICS 423', 'ICS 424', 'ICS 425', 'ICS 426', 'ICS 427', 'ICS 428', 'ICS 431', 'ICS 432', 'ICS 434',
          'ICS 435', 'ICS 438', 'ICS 441', 'ICS 442', 'ICS 443', 'ICS 451', 'ICS 452', 'ICS 455',
          'ICS 461', 'ICS 462', 'ICS 464', 'ICS 465', 'ICS 466', 'ICS 469', 'ICS 471',
          'ICS 475', 'ICS 476', 'ICS 481', 'ICS 483', 'ICS 484', 'ICS 485', 'ICS 485', 'ICS 491',
          'ICS 495', 'ICS 496', 'ICS 499'],
        defaultValue: 'ICS 111',
      },
      reason: {
        type: String,
        allowedValues: ['Homework Help', 'Finding a Study Session', 'Exam Preparation', 'Questions'],
        defaultValue: 'Homework Help',
      },
      owner: String,
      time: String,
      month: {
        type: String,
        allowedValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
        defaultValue: 'December',
      },
      day: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
          '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        defaultValue: '1',
      },
      year: {
        type: String,
        allowedValues: ['2020', '2021', '2022', '2023', '2024', '2025'],
        defaultValue: '2020',
      },
      description: String,
      findGroup: {
        type: String,
        allowedValues: ['Yes', 'No'],
        defaultValue: 'Yes',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Stuffs = new StuffsCollection();
