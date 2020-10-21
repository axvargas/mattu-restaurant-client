import { createMuiTheme } from '@material-ui/core/styles'
import { purple, teal } from "@material-ui/core/colors"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[400]
        },
        secondary: {
            main: teal[400]
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
                fontWeight: 500
            }
        },
        MuiDropzoneArea: {
            root: {
                backgroundColor: "#FAFAFA",
                minHeight: 200,
                borderWidth: 2,
                borderRadius: 6
            },
            text: {
                color: '#666666',
                fontSize: 18,
                marginTop: 10
            },
            icon: {
                color: '#666666',
                height: 40,
                marginTop: -25
            }
        },
        MuiDropzonePreviewList: {
            root: {
                justifyContent: 'center',
                alignItems: 'center'
            }
        }
    }
})
export default theme