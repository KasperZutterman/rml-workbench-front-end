import React, { useState } from 'react';
import { createStyles, makeStyles, Grid, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Columns } from '../constants/columns';
import { ComponentCategory } from '../constants/componentCategory';
import { genId } from '../utils/stringProcessing';
import ComponentForm from './forms/ComponentForm';
import ComponentItem from './items/ComponentItem';
import ColumnTitle from './ColumnTitle';

const useStyles = makeStyles(() =>
  createStyles({
    btnAdd: { paddingLeft: 0 },
    list: {
      minWidth: 200,
      maxWidth: 300,
    },
  }),
);

const isAddAllowed = (category: any) => {
  return category === ComponentCategory.Processor || category === ComponentCategory.Source;
};

interface ColumnProps {
  column: any;
  onUpdate: (id: number, data: any) => void;
}

const Column = ({ column, onUpdate }: ColumnProps) => {
  const classes = useStyles();
  const [detail, setDetail] = useState();

  const handleDetail = (component: any) => {
    setDetail(component);
  };

  const handleRemove = (id: number) => {
    const data = { ...column };
    data.components = data.components.filter((component: any) => component.id !== id);
    handleUpdateColumn(data);
  };

  const handleUpdate = (component: any) => {
    if (detail) {
      setDetail(null);
    }

    const data = { ...column };

    if (component.id) {
      data.components = data.components.map((c: any) => {
        if (c.id === component.id) {
          return component;
        }
        return c;
      });
    } else {
      data.components = [
        ...data.components,
        {
          id: genId(),
          ...component,
        },
      ];
    }
    handleUpdateColumn(data);
  };

  const handleUpdateColumn = (data: any) => {
    onUpdate(column.id, data);
  };

  return (
    <>
      <Grid item container xs={6}>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <ColumnTitle
              column={column}
              onUpdate={handleUpdateColumn}
              tooltip={Columns[column.category].tooltip}
            />
          </Grid>
          <Grid item>
            <List className={classes.list}>
              {column.components.map((component: any, index: number) => (
                <ComponentItem
                  key={component.id}
                  index={index}
                  onUpdate={handleDetail}
                  onRemove={handleRemove}
                  component={component}
                />
              ))}
            </List>
          </Grid>
          {isAddAllowed(column.category) && (
            <Grid item>
              <Button
                color="primary"
                component="span"
                className={classes.btnAdd}
                onClick={() => handleDetail({ category: column.category })}
              >
                <AddIcon /> Add a {column.category}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      {detail && (
        <ComponentForm onUpdate={handleUpdate} component={detail} onClose={() => setDetail(null)} />
      )}
    </>
  );
};

export default Column;
