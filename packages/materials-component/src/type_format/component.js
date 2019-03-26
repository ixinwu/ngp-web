import { withStyles } from '@ixinwu-ngp/web-styles';

const styles = {};

function TypeFormat({ value, types = [], inValid = '--' }) {
  let content;
  if (value === null || value === undefined || value === '') {
    content = inValid;
  } else {
    const text = [];
    value.split(',').forEach(v => {
      const type = types.find(item => item.key === v);
      if (type) {
        text.push(type.text);
      }
    });
    content = text.join(',');
  }

  return content;
}

export default withStyles(styles)(TypeFormat);
