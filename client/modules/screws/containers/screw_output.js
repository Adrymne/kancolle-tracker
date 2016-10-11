import { composeAll, useDeps } from 'mantra-core';
import moment from 'moment';
import _ from 'lodash';
import { composeWithRedux } from '/lib/util';
import { ScrewOutput } from '../components';

const SCREWS_PER_MEDAL = 4;
const getMedalScrews = ({ medals, end }) =>
  SCREWS_PER_MEDAL * medals * end.diff(moment().startOf('month'), 'months');

const getQuestScrews = ({ quests, end }) =>
  _.reduce(quests, (sum, { screws, isActive, type }, id) => {
    if (!isActive) {
      return sum;
    }
    switch (type) {
      case 'daily':
        return sum + end.diff(moment().startOf('day'), 'days') * screws;
      case 'weekly':
        return sum + end.diff(moment().startOf('week'), 'weeks') * screws;
      case 'monthly':
        return sum + end.diff(moment().startOf('month'), 'months') * screws;
      case 'quarterly':
        return sum +
          moment(end).add(1, 'months').diff(moment().startOf('quarter'), 'quarters') * screws;
      default:
        throw new Error(`Unknown quest type ${type} for ${id}`);
    }
  }, 0);

export const composer = ({ context }, onData) => {
  const { Store } = context();
  const { screws: { quests, medals, base, endDate } } = Store.getState();
  const end = moment(endDate);
  onData(null, {
    screws: base + getMedalScrews({ medals, end }) + getQuestScrews({ quests, end }),
  });
};

export default composeAll(
  composeWithRedux(composer),
  useDeps()
)(ScrewOutput);
