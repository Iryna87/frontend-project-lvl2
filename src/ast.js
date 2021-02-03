import _ from 'lodash';

const buildAst = (firstObj, secondObj) => {
  const children = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));
  return children.flatMap((child) => {
    if (_.has(firstObj, child) && !_.has(secondObj, child)) {
      return {
        key: child, value: firstObj[child], type: 'removed',
      };
    } if (_.has(secondObj, child) && !_.has(firstObj, child)) {
      return {
        key: child, value: secondObj[child], type: 'added',
      };
    } if (_.has(firstObj, child) && _.has(secondObj, child) && (!_.isObject(firstObj[child])
      || !_.isObject(secondObj[child])) && firstObj[child] !== secondObj[child]) {
      return {
        key: child, value1: firstObj[child], value2: secondObj[child], type: 'changed',
      };
    } if (_.isObject(firstObj[child]) && _.isObject(secondObj[child])) {
      return {
        key: child, children: buildAst(firstObj[child], secondObj[child]), type: 'nested',
      };
    }
    return {
      key: child, value: firstObj[child], type: 'unchanged',
    };
  });
};

export default buildAst;
