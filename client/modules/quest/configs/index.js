import keybinds from './keybinds';
import localStore from './local_store';

export default function (context) {
  keybinds(context);
  localStore(context);
}
