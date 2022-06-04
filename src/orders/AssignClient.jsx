import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrdersContext from '../../src/context/orders/OrdersContext';

const GET_CLIENTS = gql`
  query getClients {
    getClients {
      id
      name
      lastname
      company
      email
      phone
      seller
    }
  }
`;
const AssignClient = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [client, setClient] = useState();
  const { addClient } = useContext(OrdersContext);

  useEffect(() => {
    addClient(client);
  }, [client]);

  const handleChangeClient = (client) => {
    setClient(client);
  };

  if (loading) return 'Loading...';
  const allClients = data.getClients;

  return (
    <>
      <p className="m-1">Assign client</p>
      {error && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 w-full mx-auto mt-5 text-center">
          <p>{error.message}</p>
        </div>
      )}
      <Select
        id="clients-select"
        instanceId="clients-select"
        name="clients"
        onChange={(client) => handleChangeClient(client)}
        options={allClients}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select a client"
        noOptionsMessage={() => 'No results'}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => `${options.name} ${options.lastname}`}
      />
    </>
  );
};

export default AssignClient;
