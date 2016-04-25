import ResultTable from '../components/result_table';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { entries } from '/lib/util';
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

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, Store } = context();
  if (Meteor.subscribe('expeditions.list').ready()) {
    const expeditions = Collections.Expeditions.find().fetch();
    const update = () => {
      try {
        onData(null, {
          expeditions: rankExpeditions({
            expeditions,
            resourceWeights: Store.getState().resourceWeight,
          }),
        });
      } catch (e) {
        onData(e);
      }
    };
    try {
      Store.subscribe(update);
      update();
    } catch (e) {
      onData(e);
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(ResultTable);
