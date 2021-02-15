const { flatten } = require('underscore');
const { Changeset } = require('@models/');

/**
 * CreateChangeset Service
 *
 */
const createChangesetService = async (user, title) => Promise.all([user.getPolygons(), user.getLines(), user.getPoints()])
  .then(async (changesRaw) => {
    const changes = flatten(changesRaw);
    if (changes.length) {
      const changeset = await Changeset.create({ title, userId: user.id });
      return Promise.all(changes.map(change => change.setChangeset(changeset))).then(() => changeset);
    }
    return Promise.reject(new Error('No active changes'));
  });

module.exports = createChangesetService;
