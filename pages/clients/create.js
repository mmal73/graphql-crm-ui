import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Layout from '../../src/layouts/Layout';
import { gql, useMutation } from '@apollo/client';

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      email
      company
      phone
    }
  }
`;

const userFields = [
  {
    name: 'name',
    title: 'Name',
    placeholder: 'Client Name',
    type: 'text',
  },
  {
    name: 'lastname',
    title: 'Lastname',
    placeholder: 'Client Lastname',
    type: 'text',
  },
  {
    name: 'company',
    title: 'Company',
    placeholder: 'Client Company',
    type: 'text',
  },
  {
    name: 'email',
    title: 'Email',
    placeholder: 'Client Email',
    type: 'email',
  },
  {
    name: 'phone',
    title: 'Phone',
    placeholder: 'Client Phone',
    type: 'text',
  },
];

const Create = () => {
  const router = useRouter();
  const [newClient, { data, loading, error }] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      cache.modify({
        fields: {
          getClients(existingclients = []) {
            const newClientRef = cache.writeFragment({
              data: newClient,
              fragment: gql`
                fragment newClient on Client {
                  id
                  name
                  lastname
                  email
                  company
                  phone
                }
              `,
            });
            return [...existingclients, newClientRef];
          },
        },
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      name: 'Client',
      lastname: '3',
      company: 'Company 1',
      email: 'client2@company2.com',
      phone: '9876543212',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      lastname: yup.string().required('Lastname is required'),
      company: yup.string().required('Company name is required'),
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      phone: yup.string(),
    }),
    onSubmit: async ({ name, lastname, company, email, phone }) => {
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastname,
              company,
              email,
              phone,
            },
          },
        });
        router.push('/');
      } catch (error) {}
    },
  });

  return (
    <Layout>
      {error && (
        <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
          <p>{error.message}</p>
        </div>
      )}
      <h2 className="text-3xl font-bold">Create Client</h2>
      <div className="w-full">
        <div className="">
          <form
            className="container mx-autop-2 mt-10 shadow-md pb-4 flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="bg-white rounded-lg px-8 z-10 flex justify-between flex-wrap">
              {userFields.map(({ name, title, placeholder, type }) => (
                <div key={name} className="relative mb-4 w-1/2 px-2">
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
            </div>
            <div className="flex justify-center ">
              <input
                type="submit"
                className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                value="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
