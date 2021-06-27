import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button, Box, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FirebaseContext from '../../firebase/context'

import Plate from '../ui/Plate'
const Menu = () => {
    const { db } = useContext(FirebaseContext)
    const [plates, setPlates] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('plates').onSnapshot(handleSnapshot)
        return unsubscribe
        // eslint-disable-next-line
    }, [])

    const handleSnapshot = (snapshot) => {
        const snaps = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setPlates(snaps)
    }

    return (
        <>
            <Typography variant="h6" color="initial" className="menu">Menu</Typography>
            <Box mt={2} mb={4}>
                <Button
                    component={Link}
                    to="/new-plate"
                    variant="contained"
                    color="primary"
                    id="add-new-plate"
                >
                    Add new plate
                </Button>
            </Box>
            <Grid container spacing={1}>
                {plates.map(plate => (
                    <Plate
                        key={plate.id}
                        plate={plate}
                    />
                ))}
            </Grid>

        </>
    )
}

export default Menu
