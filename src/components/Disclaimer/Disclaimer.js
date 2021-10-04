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
              <span>Our V1 Vaults are available at <a href="https://robo-vault.com/">robo-vault.com</a></span><br/>
              <span>For any questions on migration, please see <a href="https://docs.robo-vault.com/robovault-v2/robovault-v2-faq">V2 FAQ</a></span>
          </Typography>
        }
      </Grid>
      <Grid container item className={classes.root} justify="center">
        {
          <Typography className={classes.disclaimer}>{t('Disclaimer')} 
              <a href="https://docs.robo-vault.com/robovault/risks" rel="noreferrer">
                <i className={`fas fa-book ${classes.linkIcon}`}></i>
              </a>
          </Typography>
        }
      </Grid>
    </>
  );
};

export default memo(Disclaimer);
