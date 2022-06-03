const isArraySortedAsc = (array = []) => {
    return Boolean(array.reduce((n, item) => n !== false && item >= n && item));
  }

  const isArraySortedDesc = (array = []) => {
    return Boolean(array.reduce((n, item) => n !== false && item <= n && item));
  }  


module.exports = {isArraySortedAsc, isArraySortedDesc};