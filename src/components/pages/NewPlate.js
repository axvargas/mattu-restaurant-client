import React, { useContext, useState } from 'react'
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container,
    Typography,
    MenuItem
} from '@material-ui/core'
import { Controller } from "react-hook-form";

import FastfoodIcon from '@material-ui/icons/Fastfood';
import { makeStyles } from '@material-ui/core/styles'

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import { DropzoneArea } from 'material-ui-dropzone';

import ErrorMessage from '../ui/ErrorMessage'
import ReactHookFormSelect from '../ui/ReactHookFormSelect'
import LinearProgressWithLabel from '../ui/LinearProgressWithLabel'

import FirebaseContext from '../../firebase/context'
import { useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid';

const categories = [
    {
        value: '',
        label: 'None',
    },
    {
        value: 'breakfast',
        label: 'Breakfast',
    },
    {
        value: 'lunch',
        label: 'Lunch',
    },
    {
        value: 'dinner',
        label: 'Dinner',
    },
    {
        value: 'salad',
        label: 'Salad',
    },
    {
        value: 'dessert',
        label: 'Dessert',
    },
    {
        value: 'drink',
        label: 'Drink',
    },
];
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        // position: 'relative',
        paddingBottom: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 20,
    },
}));
const NewPlate = () => {
    const { db, storage } = useContext(FirebaseContext)
    const [progress, setProgress] = useState(0)
    const [URL, setURL] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const classes = useStyles()
    const schema = yup.object().shape({
        name: yup
            .string()
            .trim()
            .min(3, "The name must be a least 3 characters length")
            .required("Type the name please"),
        price: yup
            .number()
            .transform(value => (isNaN(value) ? undefined : value))
            .required("Type the price please")
            .positive("Type a positive price please"),
        category: yup
            .string()
            .trim()
            .required("Select the category please"),
        image: yup
            .array()
            .required("Upload an image of the plate please"),
        description: yup
            .string()
            .trim()
            .min(3, "The description must be a least 10 characters length")
            .required("Type the description please"),
    })

    const { handleSubmit, errors, register, formState, control, setError, setValue } = useForm({
        defaultValues: {
            name: '',
            price: null,
            category: '',
            description: '',
            image: []
        },
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    const onSubmit = async (data) => {
        const plate = {
            ...data,
            price: Number(data.price.toFixed(2)),
            image: URL,
            available: true
        }
        try {
            await db.collection('plates').add(plate)
            navigate('/menu')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = (files) => {
        const unique = uuidv4();
        const img = files[0]
        const extension = img.type.split('/')[1]
        const imgName = `${unique}.${extension}`
        setLoading(true)
        const uploadTask = storage.ref(`plates/${imgName}`).put(img);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
                setError("image", "validate", "There is an error with the image");
            },
            async () => {
                const url = await storage
                    .ref("plates")
                    .child(`${imgName}`)
                    .getDownloadURL()
                setURL(url)
            }
        );
    }
    return (
        <>
            <Grid container justify="center" alignItems="center" direction="column">
                <Container maxWidth="sm" className={classes.container}
                    component={Box}
                    boxShadow={5}
                    borderRadius={5}
                    borderTop={4}
                    bgcolor='#f6f6f6'
                    borderColor='secondary.main'
                >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <FastfoodIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            New Plate
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Product name"
                                name="name"
                                autoComplete="off"
                                autoFocus
                                inputRef={register}
                            />
                            {errors.name && <ErrorMessage message={errors.name.message} />}

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                type="number"
                                autoComplete="off"
                                inputRef={register}
                            />
                            {errors.price && <ErrorMessage message={errors.price.message} />}

                            <ReactHookFormSelect
                                id="category"
                                name="category"
                                label="Category"
                                control={control}
                                defaultValue=""
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            >
                                <MenuItem aria-label="none" value="" disabled>
                                    -- Select a category --
                                </MenuItem>
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </ReactHookFormSelect>
                            {errors.category && <ErrorMessage message={errors.category.message} />}

                            <Box mt={2} mb={1}>
                                {/* <Controller
                                    as={DropzoneArea}
                                    name="image"
                                    filesLimit={1}
                                    showAlerts={['error']}
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Upload a picture of the plate"}
                                    control={control}
                                /> */}
                                <Controller
                                    render={(props) => (
                                        <DropzoneArea
                                            filesLimit={1}
                                            showAlerts={['error']}
                                            acceptedFiles={['image/*']}
                                            dropzoneText={"Upload a picture of the plate"}
                                            onChange={(files) => {
                                                if (files.length > 0)
                                                    handleUpload(files);
                                                setValue('image', files)
                                            }}
                                            onDelete={() => {
                                                setProgress(0)
                                                setLoading(false)
                                                setURL(null)
                                            }}
                                        />
                                    )}
                                    name="image"
                                    control={control}
                                />
                            </Box>
                            {loading && <LinearProgressWithLabel value={progress} />}

                            {errors.image && <ErrorMessage message={errors.image.message} />}

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                rows={2}
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="off"
                                inputRef={register}
                            />
                            {errors.description && <ErrorMessage message={errors.description.message} />}
                            <Button
                                type={"submit"}
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={formState.isSubmitting}
                                className={classes.submit}
                            >
                                Add the new plate
                    		</Button>
                        </form>
                    </div>
                </Container>
            </Grid>
        </>
    )
}

export default NewPlate
