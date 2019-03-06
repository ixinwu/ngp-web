import withStyles from '@ixinwu-ngp/materials-component/styles/with_styles';

const styles = {};

function TextFormat({ value, inValid = '--' }) {
  let content;
  if (value === null || value === undefined || value === '') {
    content = inValid;
  } else {
    content = value;
  }

  return content;
}

export default withStyles(styles)(TextFormat);
