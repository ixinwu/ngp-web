import themeVars from '../../resources/theme_vars';

export default {
  container: {
    height: '100%',
    borderTop: `1px solid ${themeVars['border-color']}`,
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
  },
  header: {
    flex: '0 0 auto',
    padding: 10,
    fontSize: 16,
  },
  body: {
    flex: 1,
    overflow: 'auto',
    padding: 20,
  },
  footer: {
    flex: '0 0 auto',
    textAlign: 'right',
    borderTop: `1px solid ${themeVars['border-color']}`,
    padding: 10,
    '& button:not(:last-child)': {
      marginRight: 8,
    },
  },
};
