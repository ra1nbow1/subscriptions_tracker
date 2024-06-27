import React, { ReactNode } from 'react';
import { ISubscription } from '../../../features/interfaces/user.interface';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import styles from './Subscriptions.module.scss'

interface ISubscriptionProps {
  subscriptions: ISubscription[];
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Subscriptions({ subscriptions }: Readonly<ISubscriptionProps>): JSX.Element {
  function convertToHumanTimestamp(date: number): string {
    const obj = new Date(date)
    console.log(`${obj.toLocaleDateString()} ${obj.toLocaleTimeString()}`);
    return `${obj.toLocaleDateString()} ${obj.toLocaleTimeString()}`;
  }
  return (
    <Grid container rowSpacing={10} columnSpacing={{ xs: 5, sm: 5, md: 5 }}>
        {subscriptions.map((subscription) => {
          return (
            <Card key={subscription.title} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="text.primary">
                  {subscription.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Каждый {subscription.renewalPeriod}
                </Typography>
                <Typography variant="body2">
                {subscription.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Изменить</Button>
              </CardActions>
            </Card>
          )
        })}
    </Grid>
  );
}


export default Subscriptions;
