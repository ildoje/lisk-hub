
import numeral from 'numeral';

app.factory('lsk', () => ({
  normalize(value) {
    return numeral(parseInt(value, 10) || 0).divide(Math.pow(10, 8)).format('0.0[0000000]');
  },
  from(value) {
    return parseInt(value * Math.pow(10, 8), 10);
  },
}));
