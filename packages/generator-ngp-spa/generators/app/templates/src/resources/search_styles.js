export default {
  container: {},
  row: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10,
  },
  label: {
    marginRight: 10,
  },
  comp: {
    flex: 1,
  },
  op: {
    display: 'flex',
    alignItems: 'center',
    '& button:not(:last-child)': {
      marginRight: 5,
    },
  },
};
