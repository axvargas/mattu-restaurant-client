import React, { useContext, useRef, useState } from 'react'
import {
    Grid,
    Box,
    TextField,
    MenuItem
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FirebaseContext from '../../firebase/context'
const Plate = ({ plate }) => {
    const { db } = useContext(FirebaseContext)
    const matches = useMediaQuery('(min-width:380px)');
    const { id, name, category, price, description, image, available } = plate
    const availableRef = useRef(plate.available)
    const [className, setClassName] = useState(available)
    const updateAvailability = async (value) => {
        try {
            await db.collection('plates')
                .doc(id)
                .update({ available: value })
            setClassName(value)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid item xs={12}>
            <Box borderRadius="borderRadius" boxShadow={3} p={2} mt={1} borderTop={4} borderColor={className ? "primary.main" : "text.disabled"}>
                <Box display={{ xs: 'block', md: 'flex' }} flexDirection="row" >
                    <Box p={1} display="flex" justifyContent="center" alignItems="center">
                        <Box height={160} width={!matches ? "auto" : 250}>
                            <img alt="plate_img" src={image} height="100%" width="100%" />
                        </Box>
                    </Box>
                    <Box p={1}>
                        <Box fontSize="h6.fontSize" fontWeight="fontWeightMedium" mb={1}>{name}</Box>
                        <Box fontWeight="fontWeightRegular" display="flex" alignItems="center">
                            Category: <Box fontWeight="fontWeightMedium" ml={1}>$ {category}</Box>
                        </Box>
                        <Box fontWeight="fontWeightRegular" display="flex" alignItems="center">
                            Price: <Box fontWeight="fontWeightMedium" ml={1}>$ {price}</Box>
                        </Box>
                        <Box fontWeight="fontWeightRegular"> {description}</Box>
                        <Box mt={1}>

                            <TextField
                                id="outlined-select-status"
                                size="small"
                                select
                                value={available}
                                variant="outlined"
                                color="primary"
                                inputRef={availableRef}
                                onChange={(e) => updateAvailability(e.target.value)}
                            >
                                <MenuItem value={true}>
                                    Available
                                </MenuItem>
                                <MenuItem value={false}>
                                    Not available
                                </MenuItem>
                            </TextField>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid >
    )
}

export default Plate
