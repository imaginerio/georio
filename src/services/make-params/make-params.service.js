/**
 * MakeParams Service
 *
 */
const makeParamsService = (req) => {
  const { params } = req;
  params.firstyear = parseInt(req.query.start || req.query.end || new Date().getFullYear(), 10);
  params.lastyear = parseInt(req.query.end || req.query.start || new Date().getFullYear(), 10);
  if (params.z) params.z = parseInt(params.z, 10);
  if (params.x) params.x = parseInt(params.x, 10);
  if (params.y) params.y = parseInt(params.y, 10);
  if (!params.layer) delete params.layer;
  return params;
};

module.exports = makeParamsService;
