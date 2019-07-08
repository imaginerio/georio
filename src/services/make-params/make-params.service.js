/**
 * MakeParams Service
 *
 */
const makeParamsService = (req) => {
  const { params } = req;
  params.firstyear = parseInt(req.query.start || req.query.end || new Date().getFullYear(), 10);
  params.lastyear = parseInt(req.query.end || req.query.start || new Date().getFullYear(), 10);
  return params;
};

module.exports = makeParamsService;
