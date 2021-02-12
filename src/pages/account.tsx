import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box, Button, colors, Divider } from '@material-ui/core';
import { fontcolor } from '*.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Box width='100%' marginTop='65px'>
      <Box bgcolor='rgb(244,248,250)' display='flex' padding='2vmin'>
        <Box
          borderRadius='50%'
          width='50px'
          height='50px'
          bgcolor='red'
          display='flex'
          justifyContent='center'
          alignItems='center'
          marginLeft='5vmin'
          marginTop='5%'
        >
          AC
        </Box>
        <div>
          <div style={{ margin: '5% 0' }}>
            <Typography variant='h6' color='textPrimary' style={{ marginLeft: '5vmin' }}>
              Alexander Cleoni
            </Typography>
            <Typography variant='subtitle2' color='textPrimary' style={{ marginLeft: '5vmin', color: 'grey' }}>
              Member since April 6, 2016
            </Typography>
          </div>
          <Divider />

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', margin: '5% 0' }}>
            <div>
              <Typography variant='body2' color='textPrimary' style={{ marginLeft: '5vmin', fontWeight: 600 }}>
                SUBSCRIBTION
              </Typography>
              <Typography variant='subtitle2' color='textPrimary' style={{ marginLeft: '5vmin', color: 'grey' }}>
                Monthly
              </Typography>
            </div>
            <Button variant='outlined' size='small' color='secondary' style={{ marginLeft: '60px' }}>
              Edit Billing
            </Button>
          </div>
        </div>
      </Box>
      <Divider />
      <Box width='100%' height='100%' justifyContent='center' display='flex'>
        <Typography color='textPrimary' variant='h5' style={{ fontWeight: 600 }}>
          My Homework
        </Typography>
      </Box>
    </Box>
  );
}