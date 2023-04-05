import { Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { fieldNames, getCreds, passwordRegex, setToken } from "../component/Constant";
import { changePassword } from "./api/request";
import { ToastMessage } from "../component/ToastMessage";
import Layout from "../component/Layout";
import Loader from "../component/Loader";

export default function ChangePassword({ type }) {
  const creds = getCreds();
  const [loading, setLoading] = useState(false);
  const [rememberCredentials, setRememberCredentials] = useState();
  useEffect(() => {
    console.log("🚀 ~ file: login.tsx:20 ~ Login ~ creds:", creds["email"]);
    if (creds["email"] || creds["password"]) {
      setRememberCredentials(true);
    }
  }, []);

  const initialValues = {
    [fieldNames.PASSWORD]: "",
    [fieldNames.CONFIRMPASSWORD]: "",
  };

  const validationSchema = Yup.object().shape({
    [fieldNames.PASSWORD]: Yup.string()
      .required("Password is required")
      .matches(passwordRegex, "Password is not valid"),
    [fieldNames.CONFIRMPASSWORD]: Yup.string()
      .matches(passwordRegex, "Confirm password is not valid")
      .required("New password is required")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  //   {
  //     "email": "eve.holt@reqres.in",
  //     "password": "cityslicka"
  // }
  return (
    <>

      <Layout>
        {/* <main> */}
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5  mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h3 className="card-title text-center mb-5">
                    Change Password
                  </h3>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      setLoading(true);
                      changePassword(values)
                        .then((resp) => {
                          ToastMessage(
                            "Password changed successfully!",
                            "success"
                          );
                          setLoading(false);
                          setToken(resp.data.token);
                          resetForm();
                          //   router.push("/");
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
                            New Password
                          </label>
                          <div className="form-outline">
                            <input
                              type="password"
                              name={fieldNames.PASSWORD}
                              className={clsx(
                                "form-control ",
                                {
                                  "is-invalid":
                                    touched[fieldNames.PASSWORD] &&
                                    errors[fieldNames.PASSWORD],
                                },
                                {
                                  "is-valid":
                                    touched[fieldNames.PASSWORD] &&
                                    !errors["email"],
                                }
                              )}
                              id="floatingInput"
                              placeholder="Please enter your password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[fieldNames.PASSWORD]}
                            />
                            {touched[fieldNames.PASSWORD] &&
                            errors[fieldNames.PASSWORD] ? (
                              <div className="invalid-feedback">
                                {errors[fieldNames.PASSWORD]}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="password">
                            Confirm New Password
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
                              placeholder="Please confirm your password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[fieldNames.CONFIRMPASSWORD]}
                              name={fieldNames.CONFIRMPASSWORD}
                            />
                            {touched[fieldNames.CONFIRMPASSWORD] &&
                            errors[fieldNames.CONFIRMPASSWORD] ? (
                              <div className="invalid-feedback">
                                {errors[fieldNames.CONFIRMPASSWORD]}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-login text-uppercase fw-bold"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && <Loader color="light" size="sm" />}
                            <span className="mx-1">Change Password</span>
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
        {/* </main> */}
      </Layout>
    </>
  );
}
