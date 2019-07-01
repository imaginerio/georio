/**
 * MakeParams Service
 *
 */
const makeParamsService = (req) => {
  const { params } = req;
  params.startYear = req.query.start || req.query.end || new Date().getFullYear();
  params.endYear = req.query.end || req.query.start || new Date().getFullYear();
  return params;
};

module.exports = makeParamsService;
