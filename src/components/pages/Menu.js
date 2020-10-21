import React from 'react'
import { Typography, Button, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
const Menu = () => {
    return (
        <>
            <Typography variant="h6" color="initial">Menu</Typography>
            <Box mt={2}>
                <Button
                    component={Link}
                    to="/new-plate"
                    variant="contained"
                    color="primary"
                >
                    Add new plate
                </Button>
            </Box>
        </>
    )
}

export default Menu
