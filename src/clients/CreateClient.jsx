import React from 'react';
import Router from 'next/router';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import FormClient from './FormClient';

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
const CreateClient = () => {
  const [newClient, { error }] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      cache.modify({
        fields: {
          getClients(existingclientsRefs = [], { readField }) {
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

            if (
              existingclientsRefs.some(
                (ref) => readField('id', ref) === newClient.id
              )
            ) {
              return existingclientsRefs;
            }

            return [...existingclientsRefs, newClientRef];
          },
        },
      });
    },
  });

  const initialValues = {
    name: '',
    lastname: '',
    company: '',
    email: '',
    phone: '',
  };

  const handleSubmit = async ({ name, lastname, company, email, phone }) => {
    try {
      await newClient({
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
      Router.push('/');
    } catch (error) {}
  };

  return (
    <>
      {error && (
        <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
          <p>{error.message}</p>
        </div>
      )}
      <FormClient
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        method="Create"
      />
    </>
  );
};

export default CreateClient;
