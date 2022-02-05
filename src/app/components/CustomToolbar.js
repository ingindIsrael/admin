import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BulkDelete from './ToolBar/BulkDelete';

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: '24px',
  },
  inverseIcon: {
    transform: 'rotate(90deg)',
  },
};

const CustomToolbarSelect = (props) => {
  const { classes } = props;

  return (
    <div className={classes.iconContainer}>
      <BulkDelete
        selectedRows={props.selectedRows}
        displayData={props.displayData}
        setSelectedRows={props.setSelectedRows}
        items={props.items}
        key={props.key}
        history={props.history}
        deleting={props.deleting}
        onBulkDelete={props.onBulkDelete}
      />
    </div>
  );
};

export default withStyles(defaultToolbarSelectStyles, {
  name: 'CustomToolbarSelect',
})(CustomToolbarSelect);
