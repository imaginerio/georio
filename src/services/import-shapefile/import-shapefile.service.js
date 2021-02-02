/* eslint-disable consistent-return */
const shp = require('shapefile');
const ora = require('ora');
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
      .then((source) => {
        let i = 0;
        const spinner = ora(`Loading ${file} ${i}`).start();
        return source.read()
          .then(async function log(result) {
            if (result.done) {
              spinner.succeed();
              return;
            }
            const { properties, geometry } = result.value;
            if (properties.firstyear && properties.lastyear && properties.firstyear <= properties.lastyear) {
              let type;
              properties.type = properties.type || layer.title;
              if (Object.keys(types).includes(properties.type)) {
                type = types[properties.type];
              } else {
                type = await Type.newType(layer.id, { title: properties.type });
                types[properties.type] = type;
              }
              i += 1;

              spinner.text = `Loading ${layer.title} ${i}`;
              await newFeature({
                type,
                geometry: geoms[geometry.type],
                dataType: 'geojson',
                data: {
                  properties,
                  geometry
                }
              });
            }
            return source.read().then(log);
          });
      }));
  });

module.exports = importShapefileService;
