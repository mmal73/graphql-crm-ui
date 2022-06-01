import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../src/layouts/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';

const AUTHENTICATE_USER = gql`
  mutation authenticateUser($input: authenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Signin = () => {
  const router = useRouter();

  const [authenticateUser, { loading, error }] = useMutation(AUTHENTICATE_USER);

  const formik = useFormik({
    initialValues: {
      email: 'test@gmail.com',
      password: 'password123A*',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        const { token } = data.authenticateUser;
        localStorage.setItem('token', token);

        router.push('/');
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (loading) return 'Loading...';

  return (
    <div>
      <Layout>
        <h1 className="text-center text-3xl font-bold text-blue-500">
          Sign In
        </h1>
        {error && (
          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 w-1/3 mx-auto mt-5 text-center">
            <p>{error.message}</p>
          </div>
        )}
        <form
          className="container mx-auto flex justify-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="lg:w-1/3 bg-white rounded-lg p-8 flex flex-col mt-10 z-10 shadow-md">
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <input
              type="submit"
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              value="Login"
            />
            <p className="mt-3 text-center">
              <Link href="/signup">
                <a className="text-blue-500 uppercase">Or Create account</a>
              </Link>
            </p>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Signin;
