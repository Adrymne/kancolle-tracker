const getName = ({ Collections: { Items, Ships } }, { item, ship, name }) => {
  const data = item ? Items.find(item).fetch()[0] : Ships.find(ship).fetch()[0] || { name };
  return data.name;
};

const getQuantity = ({ num }) => num && ` x${num}` || '';

export const toString = (context, reward) =>
  getName(context, reward) + getQuantity(reward);
