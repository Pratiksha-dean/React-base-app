import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { getCreds, rememberCreds, removeCreds, setToken } from "./Constant";
import Loader from "./Loader";
import { login } from "../pages/api/request";
import { ToastMessage } from "./ToastMessage";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent({ type }) {
  const navigate = useNavigate();
  const creds = getCreds();
  const [loading, setLoading] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState();
  useEffect(() => {
    if (creds["email"] || creds["password"]) {
      setRememberCredentials(true);
    }
  }, []);

  const initialValues = {
    email: creds ? creds["email"] : "",
    password: creds ? creds["password"] : "",
  };
  console.log(
    "🚀 ~ file: login.tsx:26 ~ Login ~ initialValues:",
    initialValues
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  //   {
  //     "email": "eve.holt@reqres.in",
  //     "password": "cityslicka"
  // }
  return (
    <>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h3 className="card-title text-center mb-5">
                    {type} Sign In
                  </h3>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setLoading(true);
                      login(values.email, values.password)
                        .then((resp) => {
                          ToastMessage("Login Successful!", "success");
                          setLoading(false);
                          setToken(resp.data.token);
                          if (type === "Admin") {
                            navigate("/admin/dashboard");
                          } else {
                            navigate("/dashboard");
                          }
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
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          <div className="form-outline">
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
                              id="floatingInput"
                              placeholder="Enter your email"
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
                        <div className="mb-3">
                          <label className="form-label" htmlFor="password">
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
                              id="floatingPassword"
                              placeholder="Enter your password"
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
                        <div className="d-flex justify-content-between">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={rememberCredentials}
                              id="rememberPasswordCheck"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  rememberCreds(values);
                                  setRememberCredentials(true);
                                } else {
                                  removeCreds();
                                  setRememberCredentials(false);
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rememberPasswordCheck"
                            >
                              Remember password
                            </label>
                          </div>
                          <div className="">
                            <Link to="/forgot-password" className="my-2">
                              Forgot Password
                            </Link>
                          </div>
                        </div>
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-login text-uppercase fw-bold"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && <Loader color="light" size="sm" />}
                            <span className="mx-1">Login</span>
                          </button>
                          <Link to="/sign-up" className="my-2">
                            Sign Up
                          </Link>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
