import React, { forwardRef, memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Tooltip } from '@material-ui/core';

import ValueLoader from '../ValueLoader/ValueLoader';
import styles from './styles';

const useStyles = makeStyles(styles);

const LabeledStatWithTooltip = memo(({ tooltip, label, ...passthrough }) => {
  const classes = useStyles();

  return tooltip ? (
    <Tooltip
      arrow
      TransitionComponent={Fade}
      title={tooltip}
      placement="bottom"
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      classes={{ tooltip: classes.tooltip }}
    >
      <LabeledStat
        label={
          <>
            {label} <i className="fas fa-info-circle" />
          </>
        }
        {...passthrough}
      />
    </Tooltip>
  ) : (
    <LabeledStat label={label} {...passthrough} />
  );
});

const LabeledStat = forwardRef(
  ({ value, label, boosted, isLoading = false, subvalue, ...passthrough }, ref) => {
    const classes = useStyles();
    const tooltip = 'hello' 
    return (
      <div {...passthrough} ref={ref}>
        <Typography className={classes.stat} variant="body2" gutterBottom>
          {subvalue && !isLoading ? <span className={classes.substat}>{subvalue}</span> : ''}
          {boosted ? (
            isLoading ? (
              <ValueLoader />
            ) : (
              <span className={classes.boosted}>{boosted}</span>
            )
          ) : (
            ''
          )}
          {isLoading ? (
            <ValueLoader />
          ) : (
            <span className={boosted ? classes.crossed : ''}>{value}</span>
          )}
        </Typography>
        <Typography className={classes.label} variant="body2">
          {label}
        </Typography>
        {/* <Tooltip
          arrow
          TransitionComponent={Fade}
          title={tooltip}
          placement="bottom"
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          classes={{ tooltip: classes.tooltip }}
        >
          <LabeledStat
            label={
              <>
                {label} <i className="fas fa-info-circle" />
              </>
            }
            {...passthrough}
          />
        </Tooltip> */}

        {/* <LabeledStatWithTooltip
          value={10}
          label={'test'}
          tooltip={'test2'}
          isLoading={isLoading}
        /> */}
      </div>
    );
  }
);

export default memo(LabeledStat);
