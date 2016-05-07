import { save, load } from '../libs/local_data';

export default function ({ Store }) {
  Store.dispatch({
    type: 'LOAD_LOCAL_COMPLETION_DATA',
    data: load(),
  });
  window.onbeforeunload = () => {
    save(Store.getState().quests.completion);
  };
}
