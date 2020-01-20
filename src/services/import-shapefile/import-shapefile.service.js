/* eslint-disable consistent-return */
const shp = require('shapefile');
const newFeature = require('@services/new-feature');
const { Type } = require('@models');

const geoms = {
  Polygon: 'polygon',
  LineString: 'line',
  Point: 'point'
};

/**
 * ImportShapefile Service
 *
 */
const importShapefileService = async (file, layer) => layer.getTypes()
  .then((layerTypes) => {
    const types = {};
    layerTypes.forEach((t) => {
      types[t.title] = t.id;
    });
    const model = layer.getGeomModel();
    return model.destroy({
      where: {
        TypeId: Object.values(types)
      }
    }).then(() => shp.open(file)
      .then(source => source.read()
        .then(async function log(result) {
          if (result.done) return;
          const { properties, geometry } = result.value;
          let type;
          if (Object.keys(types).includes(properties.type)) {
            type = types[properties.type];
          } else {
            type = await Type.newType(layer.id, { title: properties.type });
            types[properties.type] = type;
          }
          await newFeature({
            type,
            geometry: geoms[geometry.type],
            dataType: 'geojson',
            data: {
              properties,
              geometry
            }
          });
          return source.read().then(log);
        })));
  });

module.exports = importShapefileService;
