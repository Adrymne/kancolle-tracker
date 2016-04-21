import ResultTable from '../components/ResultTable';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { entries } from '/lib/util';
import _ from 'lodash';

function rankExpeditions(expeditions) {
  // TEMP
  // TODO: Load from redux store
  const resourceWeights = {
    fuel: 1,
    ammo: 1,
    steel: 1,
    bauxite: 1,
  };
  // TEMP END
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
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('expeditions.list').ready()) {
    const expeditions = Collections.Expeditions.find().fetch();
    try {
      onData(null, { expeditions: rankExpeditions(expeditions) });
    } catch (e) {
      onData(e);
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(ResultTable);
