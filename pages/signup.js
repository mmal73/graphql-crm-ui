import React from 'react';
import Link from 'next/link';
import Layout from '../src/layouts/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Signup = () => {
  const userFields = [
    {
      name: 'name',
      title: 'Name',
      placeholder: 'User Name',
      type: 'text',
    },
    {
      name: 'lastname',
      title: 'Lastname',
      placeholder: 'User Lastname',
      type: 'text',
    },
    {
      name: 'email',
      title: 'Email',
      placeholder: 'User Email',
      type: 'email',
    },
    {
      name: 'password',
      title: 'Password',
      placeholder: 'User Password',
      type: 'password',
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      lastname: yup.string().required('Lastname is required'),
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: yup
        .string()
        .matches(
          /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
          'password will contain at least 1 upper case letter, at least 1 lower case letter at least 1 number or special character'
        )
        .min(8)
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-center text-3xl font-bold text-blue-500">
          Sign Up
        </h1>
        <form
          className="container mx-auto flex justify-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="lg:w-1/3 bg-white rounded-lg p-8 flex flex-col mt-10 z-10 shadow-md">
            {userFields.map(({ name, title, placeholder, type }) => (
              <div key={name} className="relative mb-4">
                <label
                  htmlFor={name}
                  className="text-sm text-gray-600 font-bold mb-2"
                >
                  {title}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                  placeholder={placeholder}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[name] && formik.errors[name] ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                    {formik.errors[name]}
                  </div>
                ) : null}
              </div>
            ))}
            <input
              type="submit"
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              value="Create account"
            />
            <p className="mt-3 text-center">
              <Link href="/signin">
                <a className="text-blue-500 uppercase">Or Login</a>
              </Link>
            </p>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Signup;
