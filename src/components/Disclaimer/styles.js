const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  disclaimer: {
    padding: '12px',
    borderRadius: '0',
    background: theme.palette.background.secondary,
    marginBottom: '2rem',
    fontWeight: 900,
    color: theme.palette.text.primary,
  },
  annoucement: {
    padding: '12px',
    borderRadius: '0',
    background: theme.palette.background.announce,
    marginBottom: '2rem',
    fontWeight: 900,
    color: theme.palette.text.announce,
  },
});

export default styles;
