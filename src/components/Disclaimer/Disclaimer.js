import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const useStyles = makeStyles(styles);

const Disclaimer = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Grid container item className={classes.root} justify="center">
        {
          <Typography inline className={classes.annoucement}>
              <span>This product is in an Beta Testing phase - Please use with caution</span><br/>
          </Typography>
        }
      </Grid>
      <Grid container item className={classes.root} justify="center">
        {
          <Typography className={classes.disclaimer}>{t('Disclaimer')} 
              <a href="https://docs.robo-vault.com/security/risks" rel="noreferrer">
                <i className={`fas fa-book ${classes.linkIcon}`}></i>
              </a>
          </Typography>
        }
      </Grid>
    </>
  );
};

export default memo(Disclaimer);
