import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Avatar, Box, Button } from '@material-ui/core';

import styles from './styles';
import { platforms, assets } from './constants';

const useStyles = makeStyles(styles);

const Filters = ({
  toggleFilter,
  filters,
  platform,
  vaultType,
  asset,
  order,
  setPlatform,
  setVaultType,
  setAsset,
  setOrder,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handlePlatformChange = (_event, option) => setPlatform(option.value);
  const handleVaultTypeChange = event => setVaultType(event.target.value);
  const handleAssetChange = (_event, option) => setAsset(option.value);
  const handleOrderChange = event => setOrder(event.target.value);

  const options = [
    {
      value: 'All',
      label: t('Filters-All'),
    },
    ...assets.map(asset => ({
      value: asset,
      label: asset,
    })),
  ];
  const options2 = [
    {
      value: 'All',
      label: t('Filters-All'),
    },
    ...platforms.map(platform => ({
      value: platform,
      label: platform,
    })),
  ];

  const resetFilter = () => {
    toggleFilter('resetAll');
    setPlatform('All');
    setVaultType('All');
    setAsset('All');
    setOrder('default');
  };

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={6} sm={4} md={3}>
        <Button className={classes.reset} onClick={resetFilter}>
          {t('Filters-Reset')}
        </Button>
        <FormControl>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={filters.hideZeroBalances}
                onChange={() => toggleFilter('hideZeroBalances')}
                color="primary"
              />
            }
            // TODO: translate labels
            label={t('Hide-Zero-Balances')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        <FormControl>
          <FormControlLabel
            className={classes.label}
            control={
              <Checkbox
                checked={filters.hideZeroVaultBalances}
                onChange={() => toggleFilter('hideZeroVaultBalances')}
                color="primary"
              />
            }
            // TODO: translate labels
            label={t('Hide-Zero-Vault-Balances')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        <FormControl className={classes.selectorContainer}>
          <Autocomplete
            value={options2.find(option => option.value === platform)}
            onChange={handlePlatformChange}
            className={classes.selector}
            id="select-asset"
            options={options2}
            getOptionLabel={options2 => options2.label}
            renderInput={params => (
              <TextField
                {...params}
                label={t('Filters-Platform')}
                InputLabelProps={{
                  className: classes.selectorLabel,
                }}
              />
            )}
            disableClearable
          />
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        <FormControl className={classes.selectorContainer}>
          <Autocomplete
            value={options.find(option => option.value === asset)}
            onChange={handleAssetChange}
            className={classes.selector}
            id="select-asset"
            options={options}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                label={t('Filters-Asset')}
                InputLabelProps={{
                  className: classes.selectorLabel,
                }}
              />
            )}
            disableClearable
          />
        </FormControl>
      </Grid>

    </Grid>
  );
};

export default Filters;
