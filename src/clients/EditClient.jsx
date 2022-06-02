import React from 'react';
import Router from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import FormClient from './FormClient';

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      lastname
      company
      email
      phone
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      id
      name
      lastname
      company
      email
      phone
    }
  }
`;
const EditClient = ({ id }) => {
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id,
    },
  });
  const [updateClient, { errorM }] = useMutation(UPDATE_CLIENT);

  if (loading) return 'Loading...';

  if (error || errorM) {
    return (
      <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
        <p>{error.message}</p>
      </div>
    );
  }

  const { name, lastname, company, email, phone } = data.getClient;
  const initialValues = {
    name,
    lastname,
    company,
    email,
    phone,
  };

  const handleSubmit = async ({ name, lastname, company, email, phone }) => {
    try {
      await updateClient({
        variables: {
          id,
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
    } catch (error) {
      console.log(error.message);
    }
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
        method="Edit"
      />
    </>
  );
};

export default EditClient;
