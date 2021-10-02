import React, { useCallback, useMemo } from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { formatTvl, formatReserves } from 'features/helpers/format';
import { byDecimals } from 'features/helpers/bignumber';
import styles from './styles';
import PoolPaused from './PoolPaused/PoolPaused';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import ApyStats from './ApyStats/ApyStats';
import LabeledStatWithTooltip from './LabeledStat/LabeledStatWithTooltip';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  launchpool,
  toggleCard,
  balanceSingle,
  sharesBalance,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  address
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const vaultStateTitle = useMemo(() => {
    let state =
      pool.status === 'eol'
        ? t('Vault-DepositsRetiredTitle')
        : pool.depositsPaused
        ? t('Vault-DepositsPausedTitle')
        : null;

    if (launchpool) {
      state = t('Stake-BoostedBy', { name: launchpool.name });
    }

    if (pool.experimental) {
      state = t('Vault-Experimental');
    }

    return state === null ? (
      ''
    ) : (
      <PoolPaused
        message={t(state)}
        isBoosted={!!launchpool}
        isExperimental={!!pool.experimental}
      />
    );
  }, [pool, launchpool, t]);
  
  apy.maxApy = pool.maxApy
  apy.apy24hrs = pool.apy24hrs
  const balanceUsd = balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.earnedTokenDecimals
  );
  const depositedUsd = deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice) : '';
  const balanceReservesUsd = deposited > 0 && fetchVaultsDataDone ? formatTvl(pool.balanceReserves, pool.oraclePrice) : '';  

  const onSummaryClick = useCallback(
    e => {
      if (!e.target || !e.target.classList.contains('tooltip-toggle')) {
        toggleCard();
      }
    },
    [toggleCard]
  );

  return (
    <AccordionSummary
      className={
        pool.status === 'eol'
          ? classes.detailsRetired
          : pool.depositsPaused
          ? classes.detailsPaused
          : classes.details
      }
      style={{ justifyContent: 'space-between' }}
      onClick={onSummaryClick}
    >
      <Grid container alignItems="center" style={{ paddingTop: '20px' }}>
        {vaultStateTitle}
        <Grid item xs={12} className={`${classes.item} ${classes.itemTitle}`}>
          <PoolTitle
            name={pool.name}
            logo={pool.logo}
            poolId={pool.id}
            description={t('Vault-Description', { vault: pool.tokenDescription })}
            liquidityWarning={t('Liquidity-Warning', { shortToken: pool.shortToken })}
            collateralCapWarning={t('Collateral-Warning', { token: pool.token })}
            launchpool={launchpool}
            addLiquidityUrl={pool.addLiquidityUrl}
            removeLiquidityUrl={pool.removeLiquidityUrl}
            buyTokenUrl={pool.buyTokenUrl}
            buyTokenAnalyticsUrl={toTokenAnalyticsUrl(address, pool.id)}
            holderAnalyticsUrl={sharesBalance > 0 ? toHolderAnalyticsUrl(address, pool.id) : null}
            assets={pool.assets}
            lowLiquidity={pool.lowLiquidity}
            collateralCap={pool.collateralCap}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.item} ${classes.itemBalances}`}>
          <LabeledStat
            value={formatDecimals(balanceSingle)}
            subvalue={balanceUsd}
            label={t('Vault-Wallet')}
            isLoading={!fetchBalancesDone}
            className={classes.itemInner}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.item} ${classes.itemBalances}`}>
          <LabeledStat
            value={formatDecimals(deposited)}
            subvalue={depositedUsd}
            label={t('Vault-Holdings')}
            isLoading={!fetchBalancesDone}
            className={classes.itemInner}
          />
        </Grid>
        <Grid item xs={6} className={`${classes.item} ${classes.itemStats}`}>
          <LabeledStatWithTooltip
            value={formatReserves(pool.balanceReserves, 1)}
            subvalue={balanceReservesUsd}
            label={t('Vault-Reserves')}
            isLoading={!fetchVaultsDataDone}
            className={classes.itemInner}
            tooltip={t('Vault-ReservesTooltip')}
          />
        </Grid>
          <ApyStats
            apy={apy}
            launchpoolApr={launchpool && launchpool.apy ? launchpool.apy : null}
            isLoading={!fetchApysDone}
            itemClasses={`${classes.item} ${classes.itemStats}`}
            itemInnerClasses={classes.itemInner}
            status={pool.status}
          />
        <Grid item xs={6} className={`${classes.item} ${classes.itemStats}`}>
          <LabeledStat
            value={formatTvl(pool.tvl, pool.oraclePrice)}
            label={t('Vault-TVL')}
            isLoading={!fetchVaultsDataDone}
            className={classes.itemInner}
          />
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

const toHolderAnalyticsUrl = (address, id) => {
  const url = `http://analytics.robo-vault.com/d/-b1gQ0G7k/holder-balance?orgId=1&var-vault=${id}&var-address=${address.toLowerCase()}`
  return url
}

const toTokenAnalyticsUrl = (address, id) => {
  const url = `http://analytics.robo-vault.com/d/DkDnB-Z7z2/vaults-dash-v2?orgId=1&var-vault=${id}`
  return url
}

export default PoolSummary;
