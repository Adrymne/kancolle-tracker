export default function load(context, actions) {
  const { Meteor, Collections, Tracker } = context;
  Meteor.subscribe('quests.list', () => {
    Tracker.autorun(() => {
      const data = Collections.Quests.find().fetch();
      actions.quests.buildTree(context, data);
    });
  });
}
