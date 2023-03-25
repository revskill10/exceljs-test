const moment = require("moment");

const result = [];
const startAt = 1613378593909;
const step = 1000 * 60 * 60 * 3;
for (let i = 0; i < 1000; i++) {
  const timestamp =
    i === 0 ? startAt : result[i - 1].predictDt.valueOf() + step;
  const value = 900 + Math.random() * 200;
  result.push({
    predictDt: moment(timestamp),
    predictValue: value
  });
}

module.exports = result;
