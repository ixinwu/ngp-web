import numeral from 'numeral';
import { withStyles } from '@ixinwu-ngp/web-framework';

const styles = {};

function NumberFormat({ value, format = '', inValid = '--' }) {
  let content;
  const v = value * 1;
  if (Number.isNaN(v)) {
    content = inValid;
  } else {
    content = numeral(value).format(format || '0,0');
  }

  return content;
}

export default withStyles(styles)(NumberFormat);
