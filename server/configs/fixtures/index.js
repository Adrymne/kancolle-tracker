import expeditions from './expeditions';
import db from './db';

export default function () {
  expeditions();
  db();
}
