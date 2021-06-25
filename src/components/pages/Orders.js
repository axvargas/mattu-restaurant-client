import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Grid
} from '@material-ui/core';
import FirebaseContext from '../../firebase/context';
import Order from '../ui/Order';

const Orders = () => {
  const { db } = useContext(FirebaseContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      db.collection('orders').where('completed', '==', false).onSnapshot(handleSnapshot);
    };
    getOrders();
    // eslint-disable-next-line
    }, [])

  const handleSnapshot = (snapshot) => {
    const response = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    setOrders(response);
  };
  return (
    <>
      <Typography variant="h6" color="initial">Orders</Typography>
      <Grid container spacing={2}>
        {orders.map(order => (
          <Order
            key={order.id}
            orderInfo={order}
          />
        ))}
      </Grid>
    </>
  );
};

export default Orders;
