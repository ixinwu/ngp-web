import numberFormat from 'number-format.js';
import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';

const styles = {};

function NumberFormat({ value, format = '', options = {}, inValid = '--' }) {
  let content;
  const v = value * 1;
  if (Number.isNaN(v)) {
    content = inValid;
  } else {
    content = numberFormat(format || '#,###.', value, options || {});
  }

  return content;
}

export default withStyles(styles)(NumberFormat);
