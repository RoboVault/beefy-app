import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import { Fade, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(styles);

const lowLiquidityTooltip = memo(({ rows }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.label} variant="body3">
        {'Based on the performance of the previous 7 days or since launch'}
      </Typography>
    </div>
  );
});

const singleAssetExtensions = ['svg', 'webp', 'png'];
const singleAsset = symbol => {
  for (let ext of singleAssetExtensions) {
    try {
      return require(`images/single-assets/${symbol}.${ext}`);
    } catch (error) {
      console.warn(error);
    }
  }
  throw new Error(`Image required for '${symbol}' token in 'images/single-assets/'`);
};

const PoolTitle = ({
  name,
  logo,
  poolId,
  description,
  liquidityWarning,
  collateralCapWarning,
  launchpool,
  buyTokenUrl,
  buyTokenAnalyticsUrl,
  holderAnalyticsUrl,
  addLiquidityUrl,
  removeLiquidityUrl,
  assets,
  lowLiquidity,
  collateralCap,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  let avatar;
  if (logo) {
    avatar = (
      <Avatar
        alt={logo}
        variant="square"
        className={classes.icon}
        imgProps={{ style: { objectFit: 'contain' } }}
        src={require(`images/${logo}`)}
      />
    );
  } else {
    avatar = (
      <AvatarGroup className={`${classes.icon} MuiAvatar-root MuiAvatar-square`} spacing="small">
        <Avatar
          alt={assets[0]}
          variant="square"
          imgProps={{ style: { objectFit: 'contain' } }}
          src={singleAsset(assets[0])}
        />
        <Avatar
          alt={assets[1]}
          variant="square"
          imgProps={{ style: { objectFit: 'contain' } }}
          src={singleAsset(assets[1])}
        />
      </AvatarGroup>
    );
  }

  return (
    <Grid container wrap="nowrap">
      {avatar}
      <div className={classes.texts}>
        <Typography className={classes.title} variant="body2" gutterBottom>
          {poolId ? (
            <a href={`/vault/${poolId}`} className={classes.url}>
              {name}
            </a>
          ) : (
            name
          )}
          {lowLiquidity ? (
            <Tooltip
              arrow
              TransitionComponent={Fade}
              title={liquidityWarning}
              placement="bottom"
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              classes={{ tooltip: classes.tooltip }}
            >
            <span className={classes.subtitle} variant="body2">{' ⚠️ (Low Liquidity)'}</span>
            </Tooltip>
          ) : (
            ''            
          )}
          {collateralCap ? (
            <Tooltip
              arrow
              TransitionComponent={Fade}
              title={collateralCapWarning}
              placement="bottom"
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              classes={{ tooltip: classes.tooltip }}
            >
            <span className={classes.subtitle} variant="body2">{' ⚠️ (Collateral Capped)'}</span>
            </Tooltip>
          ) : (
            ''            
          )}
        </Typography>
        <Typography className={classes.subtitle} variant="body2">
          {description}
        </Typography>
        <div style={{ display: 'flex', marginTop: '6px' }}>
          {buyTokenUrl ? (
            <a className={classes.url} href={buyTokenUrl} target="_blank" rel="noopener noreferrer">
              <span>{name === 'WBNB' ? t('Wrap-BNB') : t('Buy-Token')}</span>
              {'\u00A0\u00A0'}
            </a>
          ) : (
            ''
          )}
          {buyTokenAnalyticsUrl ? (
            <a className={classes.url} href={buyTokenAnalyticsUrl} target="_blank" rel="noopener noreferrer">
              <span>{'📈'}</span>
              {'\u00A0\u00A0'}
            </a>
          ) : (
            ''
          )}
          {holderAnalyticsUrl ? (
            <a className={classes.url} href={holderAnalyticsUrl} target="_blank" rel="noopener noreferrer">
              <span>{'💰'}</span>
              {'\u00A0\u00A0'}
            </a>
          ) : (
            ''
          )}
          {addLiquidityUrl ? (
            <a
              className={classes.url}
              href={addLiquidityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('Add-Liquidity')}</span>
            </a>
          ) : (
            ''
          )}
          {removeLiquidityUrl ? (
            <a
              className={classes.url}
              href={removeLiquidityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('Remove-Liquidity')}</span>
            </a>
          ) : (
            ''
          )}
        </div>
        {launchpool ? (
          <a className={classes.btnBoost} href={'/stake/pool/' + launchpool.id}>
            <img alt="Boost" src={require('images/stake/boost.svg')} height={15} />
            <span>
              <img alt="Fire" src={require('images/stake/fire.png')} height={30} />
            </span>
          </a>
        ) : (
          ''
        )}
      </div>
    </Grid>
  );
};

export default memo(PoolTitle);
