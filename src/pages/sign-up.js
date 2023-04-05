import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { signUp } from "./api/request";
import { Link, useNavigate } from "react-router-dom";
import { passwordRegex } from "../component/Constant";
import { ToastMessage } from "../component/ToastMessage";
import Loader from "../component/Loader";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const genderList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(passwordRegex, "Password is not valid"),
    confirmPassword: Yup.string()
      .matches(passwordRegex, "Confirm password is not valid")
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    phone: Yup.number().required("Phone number is required"),
  });
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                  Registration Form
                </h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setLoading(true);
                    signUp(values)
                      .then((resp) => {
                        ToastMessage("Registration Successful!", "success");
                        setLoading(false);
                        navigate("/login");
                      })
                      .catch((err) => {
                        setLoading(false);
                        ToastMessage(err.response.data.error, "error");
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                          <div className="form-outline">
                            <input
                              type="text"
                              name="firstName"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["firstName"] && errors["firstName"],
                                },
                                {
                                  "is-valid":
                                    touched["firstName"] &&
                                    !errors["firstName"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}
                            />
                            {touched.firstName && errors.firstName ? (
                              <div className="invalid-feedback">
                                {errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                          <div className="form-outline">
                            <input
                              type="text"
                              name="lastName"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["lastName"] && errors["lastName"],
                                },
                                {
                                  "is-valid":
                                    touched["lastName"] && !errors["lastName"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                            />
                            {touched.lastName && errors.lastName ? (
                              <div className="invalid-feedback">
                                {errors.lastName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="birthdayDate" className="form-label">
                            Birthday
                          </label>
                          <div className="form-outline">
                            <input
                              type="date"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["dateOfBirth"] &&
                                    errors["dateOfBirth"],
                                },
                                {
                                  "is-valid":
                                    touched["dateOfBirth"] &&
                                    !errors["dateOfBirth"],
                                }
                              )}
                              id="dateOfBirth"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dateOfBirth}
                            />
                            {touched.dateOfBirth && errors.dateOfBirth ? (
                              <div className="invalid-feedback">
                                {errors.dateOfBirth}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="birthdayDate" className="form-label">
                            Gender:{" "}
                          </label>
                          <br />
                          {genderList.map((item, i) => {
                            return (
                              <div
                                className="form-check form-check-inline"
                                key={i}
                              >
                                <label
                                  className="form-check-label"
                                  htmlFor="femaleGender"
                                >
                                  {item.label}
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value={item.value}
                                  checked={item.value === values.gender}
                                  onChange={(e) => {
                                    setFieldValue("gender", e.target.value);
                                  }}
                                />
                              </div>
                            );
                          })}
                          {touched.gender && errors.gender ? (
                            <div className="invalid-feedback">
                              {errors.gender}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col-md-6 mb-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="emailAddress"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["email"] && errors["email"],
                                },
                                {
                                  "is-valid":
                                    touched["email"] && !errors["email"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {touched.email && errors.email ? (
                              <div className="invalid-feedback">
                                {errors.email}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <div className="form-outline">
                            <input
                              type="tel"
                              name="phone"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["phone"] && errors["phone"],
                                },
                                {
                                  "is-valid":
                                    touched["phone"] && !errors["phone"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            {touched.phone && errors.phone ? (
                              <div className="invalid-feedback">
                                {errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="phoneNumber">
                            Password
                          </label>
                          <div className="form-outline">
                            <input
                              type="password"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["password"] && errors["password"],
                                },
                                {
                                  "is-valid":
                                    touched["password"] && !errors["password"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              name="password"
                            />
                            {touched.password && errors.password ? (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label" htmlFor="phoneNumber">
                            Confirm Password
                          </label>
                          <div className="form-outline">
                            <input
                              type="password"
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched["confirmPassword"] &&
                                    errors["confirmPassword"],
                                },
                                {
                                  "is-valid":
                                    touched["confirmPassword"] &&
                                    !errors["confirmPassword"],
                                }
                              )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                              name="confirmPassword"
                            />
                            {touched.confirmPassword &&
                            errors.confirmPassword ? (
                              <div className="invalid-feedback">
                                {errors.confirmPassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <Link to="/login">Already have an account?</Link>
                      <div className="mt-4 pt-2">
                        <button
                          className="btn btn-primary btn-login text-uppercase fw-bold"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <Loader color="light" size="sm" />}
                          <span className="mx-1">Sign Up</span>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
