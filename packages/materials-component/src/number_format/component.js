import numeral from 'numeral';
import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {};

function NumberFormat({ value, format = '', inValid = '--', prefix = '', suffix = '' }) {
  let content;
  const v = Number.parseFloat(value);
  if (Number.isNaN(v)) {
    content = inValid;
  } else {
    content = `${prefix}${numeral(value).format(format || '0,0')}${suffix}`;
  }

  return content;
}

export default withStyles(styles)(NumberFormat);
