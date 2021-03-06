import React, { useState } from 'react';
import {
  Button,
  Divider,
  Fade,
  List,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProjectItem from '../components/items/ProjectItem';
import { redirectTo } from '../services/history';
import { getProjects, removeProject } from '../utils/storage';

import background from '../assets/background.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2),
    },
    list: {
      width: '100%',
      maxWidth: 400,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    paper: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
  }),
);

const handleNewProject = () => {
  redirectTo('untitled/dashboard');
};

const handleOpenProject = (project: any) => {
  redirectTo(`${project.id}/dashboard`);
};

const Project = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState(getProjects());

  const handleRemoveProject = (project: any) => {
    removeProject(project);
    setProjects(getProjects());
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" gutterBottom>
        RML.io Dashboard
      </Typography>
      <Typography component="h2" variant="subtitle1" gutterBottom>
        You currently have <strong>{Object.keys(projects).length}</strong> projects saved.
      </Typography>
      <List className={classes.list}>
        {Object.keys(projects).map((project: any, index: number) => (
          <Fade in={true} key={index} timeout={(index + 1) * 400}>
            <div>
              <ProjectItem
                project={projects[project]}
                onClick={() => handleOpenProject(projects[project])}
                onRemove={() => handleRemoveProject(projects[project])}
              />
              <Divider variant="inset" component="li" light />
            </div>
          </Fade>
        ))}
      </List>
      <Divider />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleNewProject}
        startIcon={<AddIcon />}
      >
        New Project
      </Button>
    </div>
  );
};

export default Project;
