import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box';
import Spinner from './Spinner'
import Alert from './Alert'
import './Pstyles.css';
import Container from '@material-ui/core/Container';
export default class PasswordReset extends Component {
 
 styles = theme => ({
     
 
});   state = {
    passChangeSuccess: false,
  }

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,

    }))
  }

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false }))
    }

    return (
      <Alert
        isOpen={this.state.passChangeSuccess}
        onClose={this._handleClose}
        handleSubmit={onClick}
        title="Password Recovery"
        text="Your password was changed successfully"
        submitButtonText="Done"
      />
    )
  }

  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    // fake async login
    setTimeout(async () => {
      setSubmitting(false)

      this.setState(() => ({
        passChangeSuccess: true,
      }))

      resetForm()
    }, 1000)
  }

  render() {
    return (
      <Formik
        initialValues={{
          
          newPass: '',
          confirmPass: '',
        }}
        validationSchema={object().shape({
          
          newPass: string().required('New password is required'),
          confirmPass: string()
            .oneOf([ref('newPass')], 'Passwords do not match')
            .required('Password is required'),
        })}
        onSubmit={(
          {  newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            
            newPass,
            confirmPass,
            setSubmitting,
            resetForm,
          })
        }
        render={props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props
          return isSubmitting ? (
            <Spinner />
          ) : (
            <Container  maxWidth="xs" >
                
            <Paper className="form form--wrapper" elevation={10}>
                <Box m={2} color="primary.main"
                
               borderColor="text.primary"
                zIndex="modal">

              <form className="form" onSubmit={handleSubmit}>
                <FormControl fullWidth margin="dense" marginTop="dense">
                 
                    
                 
                  <FormHelperText
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <h1>Password Reset</h1>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                
              
                  <InputLabel
                  
                    htmlFor="password-new"
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {'New Password'}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.newPass && errors.newPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {touched.newPass && errors.newPass ? errors.newPass : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {'Confirm Password'}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="confirmPass"
                    type="password"
                    value={values.confirmPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="raised"
                  color='inherit'
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: '30px', color: 'inherit' }}
                >
                  {'Reset'}
                </Button>
              </form>
              </Box>
              {this._renderModal()}
            </Paper>
            </Container>
          )
        }}
      />
    )
  }
}
