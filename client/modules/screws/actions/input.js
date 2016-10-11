export default {
  setBase({ Store }, screws) {
    Store.dispatch({ type: 'SET_SCREW_BASE', base: parseInt(screws, 10) || 0 });
  },
  setMedals({ Store }, medals) {
    Store.dispatch({ type: 'SET_SCREW_MEDALS', medals: parseInt(medals, 10) || 0 });
  },
  setEndDate({ Store }, endDate) {
    Store.dispatch({ type: 'SET_SCREW_END_DATE', endDate });
  },
  toggleQuest({ Store }, questId) {
    Store.dispatch({ type: 'TOGGLE_SCREW_QUEST', id: questId });
  },
};
