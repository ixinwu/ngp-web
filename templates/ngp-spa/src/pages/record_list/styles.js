import themeVars from '../../resources/theme_vars';

export default {
  container: {
    height: '100%',
    overflow: 'auto',
  },
  header: {
    background: '#fff',
    padding: 10,
    fontSize: 16,
  },
  body: {
    padding: 20,
  },
  section: {
    padding: '20px 20px 0 20px',
    background: '#fff',
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  sectionHeader: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    '& > button': {
      marginRight: 8,
    },
  },
  sectionBody: {},
  operateColumn: {
    '& $op:not(:last-child)': {
      marginRight: 5,
    },
  },
  op: {
    color: themeVars['link-color'],
    cursor: 'pointer',
  },
};
