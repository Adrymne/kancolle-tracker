import ResultTable from '../components/result_table';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { composeWithRedux, entries } from '/lib/util';
import _ from 'lodash';

function rankExpeditions({ expeditions, resourceWeights }) {
  return expeditions.map((expedition) => {
    let score = 0;
    for (const [resourceType, weight] of entries(resourceWeights)) {
      score += expedition.output[resourceType] * weight;
    }
    return {
      ...expedition,
      score,
      isSparkled: !! _.find(expedition.fleet, { isSparkled: true }),
    };
  }).sort((a, b) => b.score - a.score);
}

export const collectionComposer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('expeditions.list').ready()) {
    onData(null, {
      expeditions: Collections.Expeditions.find().fetch(),
    });
  }
};

export const reduxComposer = ({ expeditions, context }, onData) => {
  const { Store } = context();
  onData(null, {
    expeditions: rankExpeditions({
      expeditions,
      resourceWeights: Store.getState().resourceWeight,
    }),
  });
};

export default composeAll(
  composeWithRedux(reduxComposer),
  composeWithTracker(collectionComposer),
  useDeps()
)(ResultTable);
