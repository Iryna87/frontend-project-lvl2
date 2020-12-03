import _ from 'lodash';

const stylish = (diff) => {
  const result = {};
  diff.map((item) => {
    console.log(item);
    if (item.status === 'not modified') {
      result[`    ${item.key}`] = item.value;
      return result;
    } if (item.status === 'added') {
      result[`+   ${item.key}`] = item.value;
      return result;
    } if (item.status === 'removed') {
      result[`-   ${item.key}`] = item.value;
      return result;
    } if (_.has(item, 'children')) {
      const temp = item.children;
      return stylish(temp);
    }
    return null;
  });
};

export default stylish;
