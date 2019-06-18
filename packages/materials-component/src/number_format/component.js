import numeral from 'numeral';
import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {};

function NumberFormat({ value, format = '', inValid = '--' }) {
  let content;
  const v = Number.parseFloat(value);
  if (Number.isNaN(v)) {
    content = inValid;
  } else {
    content = numeral(value).format(format || '0,0');
  }

  return content;
}

export default withStyles(styles)(NumberFormat);
