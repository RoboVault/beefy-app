import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { formatApy } from '../../../../helpers/format';
import { isNaN } from '../../../../helpers/bignumber';
import LabeledStat from '../LabeledStat/LabeledStat';
import { Fade, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import LabeledStatWithTooltip from '../LabeledStat/LabeledStatWithTooltip';

const useStyles = makeStyles(styles);

const ApyStats = ({ apy, isLoading = false, itemClasses, itemInnerClasses, status }) => {
  const { t } = useTranslation();
  const values = {};

  values.maxApy = apy.maxApy;
  values.apy24hrs = apy.apy24hrs;
  if (apy.apy3d) values.apy = apy.apy3d;
  else if (apy.apy2d) values.apy = apy.apy2d;
  else values.apy = apy.apy1d;

  const formatted = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, formatApy(value)])
  );

  return (
    <>
      <Grid item xs={4} className={itemClasses}>
        <LabeledStatWithTooltip
          value={status == 'eol' || values.apy < 0 ? '0%' : formatted.apy}
          label={t('Vault-APY')}
          tooltip={t('Vault-APY-Tooltip')}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
    </>
  );
};

export default memo(ApyStats);
