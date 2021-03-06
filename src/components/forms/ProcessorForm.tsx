import React, { useState } from 'react';
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { ComponentCategory } from '../../constants/componentCategory';
import { TARGETS_DEFAULT, MAPPER_CONFIG } from '../../constants/targets';
import { FormProps } from './ComponentForm';
import MyDialog from '../MyDialog';

const DEFAULT = {
  type: 'mapper',
  target: 'ttl',
  category: ComponentCategory.Processor,
  config: '',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(2),
      backgroundColor: deepOrange[500],
      color: theme.palette.getContrastText(deepOrange[500]),
    },
    formControl: {
      minWidth: '100%',
      marginBottom: theme.spacing(2),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(0.5),
    },
  }),
);

const ProcessorForm = ({ component, onClose, onUpdate }: FormProps) => {
  const classes = useStyles();
  const [data, setData] = useState({
    ...DEFAULT,
    ...component,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    onUpdate({
      ...data,
    });
  };

  return (
    <MyDialog
      children={
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" value={data.type} name="type" onChange={handleChange}>
              {Object.keys(MAPPER_CONFIG).map((type) => (
                <MenuItem key={type} value={type}>
                  <div className={classes.item}>
                    <Typography>{MAPPER_CONFIG[type].type}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="target">Target</InputLabel>
            <Select labelId="target" value={data.target} name="target" onChange={handleChange}>
              {Object.keys(TARGETS_DEFAULT).map((target) => (
                <MenuItem key={target} value={target}>
                  <div className={classes.item}>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                    <Typography>
                      {TARGETS_DEFAULT[target].name} ({TARGETS_DEFAULT[target].extension})
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {data.type === 'mapper' ? (
            <TextField
              autoFocus
              variant="outlined"
              id="name"
              label="Config"
              multiline
              size="medium"
              name="config"
              rows={30}
              value={data.config}
              onChange={handleChange}
              fullWidth
            />
          ) : (
            <></>
          )}
        </>
      }
      onClose={onClose}
      onSave={handleSave}
      open={true}
      save="Save"
      title={
        <>
          <AccountTreeIcon /> Mappings config
        </>
      }
    />
  );
};

export default ProcessorForm;
