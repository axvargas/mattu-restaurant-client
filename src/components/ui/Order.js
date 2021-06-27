import React, { useContext } from 'react';
import {
  Box,
  TextField,
  Grid,
  Button,
  Fab
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FirebaseContext from '../../firebase/context';

const Order = ({ orderInfo }) => {
  const { db } = useContext(FirebaseContext);
  const { id, order, total, completed, timeToBeReady } = orderInfo;
  const theme = useTheme();
  const schema = yup.object().shape({
    time: yup
      .number()
      .transform(value => (isNaN(value) ? undefined : value))
      .required('Type the time please')
      .positive('Type a positive time please')
      .integer('Type only integer values')
      .max(30, 'Not more than 30 minutes')
  });

  const { handleSubmit, errors, register, formState, reset } = useForm({
    defaultValues: {
      time: null
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      await db.collection('orders')
        .doc(id)
        .update({
          timeToBeReady: Number(data.time)
        });
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const completeOrder = async () => {
    try {
      await db.collection('orders')
        .doc(id)
        .update({ completed: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid id={`order-${id}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Box borderRadius="borderRadius" boxShadow={3} p={2} mt={1} borderTop={4}>
        <Box p={1}>
          <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium" mb={1}>{id}</Box>
          <Box my={1}>
            {order.map((subOrder, i) => (
              <Box key={subOrder + i} fontWeight="fontWeightRegular" color="text.secondary" display="flex" alignItems="center">
                {subOrder.name}
              </Box>
            ))}
          </Box>

          <Box fontWeight="fontWeightRegular" display="flex" alignItems="center">
                        Total: <Box fontWeight="fontWeightMedium" ml={1}>$ {total}</Box>
          </Box>
          {timeToBeReady === 0 &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Box>
                            <TextField
                              size="small"
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              id="time"
                              label="Time to be ready"
                              name="time"
                              type="number"
                              autoComplete="off"
                              inputRef={register}
                              FormHelperTextProps={{ 
                                style: { color: theme.palette.primary.main } 
                              }}
                              helperText={errors.time ? errors.time.message : null}
                            />
                          </Box>
                          <Button
                            type={'submit'}
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={formState.isSubmitting || !formState.isValid}
                          >
                            Set time</Button>
                        </form>
          }
          {timeToBeReady > 0 &&
                        <Box
                          mt={1}
                          display="flex"
                          justifyContent="center"
                        >
                          <Fab size="large" color="secondary" disableRipple style={{ cursor: 'default' }}>
                            <Box fontSize="h6.fontSize">
                              {timeToBeReady}'
                            </Box>
                          </Fab>
                        </Box>
          }
          {!completed && timeToBeReady > 0 &&
                        <Box mt={1}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => completeOrder()}
                          >
                                Set as ready
                          </Button>
                        </Box>
          }
        </Box>
      </Box>
    </Grid >
  );
};

export default Order;
