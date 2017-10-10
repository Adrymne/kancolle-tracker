import { Quests, Ships, Items } from '/lib/collections';

const readFromFile = (assetPath) => {
  const text = Assets.getText(assetPath);
  return JSON.parse(text);
};

const upsertTo = (collection) => (doc) => collection.upsert(doc._id, doc);

const writeToDb = (collection, docs) => Promise.all(docs.map(upsertTo(collection)));

const loadData = async (collection, assetPath) => {
  const json = readFromFile(assetPath);
  await writeToDb(collection, json);
};

export default async function () {
  try {
    const promises = [
      loadData(Ships, 'ships.json'),
      loadData(Items, 'items.json'),
      loadData(Quests, 'quests.json'),
    ];
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
}
