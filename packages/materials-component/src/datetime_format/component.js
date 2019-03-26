import moment from 'moment';
import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {};

function DatetimeFormat({ value, format = 'YYYY-MM-DD HH:mm:ss', inValid = '--' }) {
  let content;

  if (value === null || value === undefined) {
    content = inValid;
  } else {
    const v = moment(value);
    if (v.isValid()) {
      content = v.format(format || 'YYYY-MM-DD HH:mm:ss');
    } else {
      content = inValid;
    }
  }

  return content;
}

export default withStyles(styles)(DatetimeFormat);
