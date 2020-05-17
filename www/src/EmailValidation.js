import React from "react";
import { Formik } from "formik";
import './EvalidationStyle.css';
import * as Yup from "yup";
const EmailValidation = () => (
  <Formik
    initialValues={{ email: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        
        <form onSubmit={handleSubmit}>
            <h1>Password Recovery</h1>
        <h3>
          <br /> Enter your registered email address to send the password recovery
          link to reset your forgotten password.
        </h3>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Enter
          </button>
        </form>
      );
    }}
  </Formik>
);

export default EmailValidation;
