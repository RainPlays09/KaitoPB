/**
 * @param {Array<T>} arr
 */
const randomArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = { randomArray };
