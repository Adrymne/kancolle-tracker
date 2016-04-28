import { Expeditions } from '/lib/collections';
// import { Assets } from ???
/* global Assets */
import { entries } from '/lib/util';
import _ from 'lodash';

function buildUnsparkled(fleet) {
  let result = [];
  for (const [shipClass, num] of entries(fleet)) {
    result = result.concat(Array(num).fill({
      class: shipClass,
      isSparkled: false,
    }));
  }
  return result;
}
function buildSparkled(fleet) {
  let result = buildUnsparkled(fleet);
  if (result.length < 5) {
    result = result.concat(Array(5 - result.length).fill({ class: 'XX' }));
  }
  return result.map((ship) => ({ ...ship, isSparkled: true }));
}

function fillWildcards(fleets) {
  const result = [];
  fleets.forEach((fleet) => {
    const hasWildcard = !! _.find(fleet, { class: 'XX' });
    if (!hasWildcard) {
      result.push(fleet);
      return;
    }
    ['DD', 'SS'].forEach((wildcard) => {
      result.push(fleet.map((ship) => ({
        class: ship.class === 'XX' ? wildcard : ship.class,
        isSparkled: ship.isSparkled,
      })));
    });
  });
  return result;
}

// Return the fleet compositions to calculate the costs for.
function getFleets(fleet) {
  return fillWildcards([
    buildUnsparkled(fleet),
    buildSparkled(fleet),
  ]);
}

const shipConsumption = {
  SS: { fuel: 1, ammo: 2 },
  DD: { fuel: 1.5, ammo: 1.5 },
  CL: { fuel: 2.5, ammo: 2 },
  CA: { fuel: 3.5, ammo: 5 },
  AV: { fuel: 3.5, ammo: 4.5 },
  BBV: { fuel: 9.5, ammo: 10.5 },
  CT: { fuel: 3.5, ammo: 2 },
  AS: { fuel: 3.5, ammo: 1 },
};
function getShipCost({ cost }, ship) {
  const consumptionRate = shipConsumption[ship.class];
  const sparkleCost = (ship.isSparkled) ? 1 : 0;
  return {
    fuel: consumptionRate.fuel * ((cost.fuel || 0) + sparkleCost),
    ammo: consumptionRate.ammo * ((cost.ammo || 0) + sparkleCost),
  };
}

function getFleetCost(expedition) {
  const { fleet } = expedition;
  return fleet.reduce((accumulator, ship) => {
    const result = { ...accumulator };
    const cost = getShipCost(expedition, ship);
    for (const [resourceType, amount] of entries(cost)) {
      result[resourceType] += amount;
    }
    return result;
  }, { fuel: 0, ammo: 0 });
}

function getResourceDelta(expedition) {
  const { fleet, output, time } = expedition;
  const result = { fuel: 0, ammo: 0, steel: 0, bauxite: 0 };
  const cost = getFleetCost(expedition);
  const isGS = !! _.find(fleet, { isSparkled: true });
  for (const resourceType of Object.keys(result)) {
    // TODO: Calculate GS chance multiplier by number of sparkled ships
    result[resourceType] += (output[resourceType] || 0) * ((isGS) ? 1.5 * 0.95 : 1);
    result[resourceType] -= (cost[resourceType] || 0);
    result[resourceType] *= 60.0 / time; // convert to hourly rate
    result[resourceType] = Math.round(result[resourceType]);
  }
  return result;
}

export default function () {
  if (Expeditions.find().count() !== 0) {
    return;
  }
  // Expeditions.remove({}); // TEMP
  const expeditions = JSON.parse(Assets.getText('expeditions.json'));
  for (const [num, expedition] of entries(expeditions)) {
    getFleets(expedition.fleet).forEach((fleet) => {
      Expeditions.insert({
        num,
        jp: expedition.jp,
        fleet,
        output: getResourceDelta({
          ...expedition,
          fleet,
        }),
      });
    });
  }
}
