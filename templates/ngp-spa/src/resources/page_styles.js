import themeVars from './theme_vars';

export default {
  container: {
    paddingLeft: '8px',
  },
  header: {
    backgroundColor: '#fff',
    padding: '10px 24px 20px 24px',
  },
  breadcrumb: {
    marginBottom: '15px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    // marginBottom: ['20px', '!important'],
  },
  body: {
    backgroundColor: '#fff',
    margin: '24px',
    padding: '24px',
  },
  opButton: {
    color: themeVars['link-color'],
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: 5,
    },
  },
  returnIcon: {
    fontSize: '26px',
    color: themeVars['primary-color'],
    cursor: 'pointer',
    marginRight: '8px',
  },
};
