import themeVars from '../resources/theme_vars';

export default {
  container: {
    height: '100vh',
  },
  logo: {
    fontSize: 18,
    color: '#fff',
    margin: 16,
  },
  header: {
    display: 'flex',
    background: '#fff',
    padding: '0 24px',
    boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
    zIndex: 2,
  },
  headerLeft: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
  },
  headerRight: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  trigger: {
    fontSize: 18,
    cursor: 'pointer',
    transition: 'color .3s',

    '&:hover': {
      color: '#1890ff',
    },
  },
  user: {
    cursor: 'pointer',
  },
  userIcon: {
    marginRight: 8,
  },
  userName: {
    '&:hover': {
      color: '#1890ff',
    },
  },
  content: {
    flex: 1,
  },
  '@global': {
    '.ngp-table-link': {
      color: themeVars['link-color'],
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginRight: 5,
      },
    },
    '.ngp-table-op-button': {
      color: themeVars['link-color'],
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginRight: 5,
      },
    },
  },
};
