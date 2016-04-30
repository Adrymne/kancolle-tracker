import { Mongo } from 'meteor/mongo';

export const Quests = new Mongo.Collection('quests');
export const Expeditions = new Mongo.Collection('expeditions');
export const Ships = new Mongo.Collection('ships');
export const Items = new Mongo.Collection('items');
