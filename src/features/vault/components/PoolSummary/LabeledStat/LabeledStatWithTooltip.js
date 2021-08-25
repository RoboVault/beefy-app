import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fade, Tooltip } from '@material-ui/core';
import LabeledStat from '../LabeledStat/LabeledStat';
import styles from './styles';

const useStyles = makeStyles(styles);

const LabeledStatWithTooltip = ({ label, tooltip, ...passthrough }) => {
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
  };


export default memo(LabeledStatWithTooltip);
