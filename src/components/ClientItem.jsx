import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

const ClientItem = ({ client }) => {
  const { id, name, lastname, company, email, phone } = client;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      cache.modify({
        fields: {
          getClients(existingClientRefs, { readField }) {
            return existingClientRefs.filter(
              (clientRef) => id !== readField('id', clientRef)
            );
          },
        },
      });
    },
  });

  const handleDeleteClient = () => {
    Swal.fire({
      title: `Are you sure to delete ${name} ${lastname}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteClient({
            variables: {
              id: id,
            },
          });
          console.log(data);
          Swal.fire('Deleted!', data.deleteClient, 'success');
        } catch (error) {
          Swal.fire('Error!', error.message, 'error');
        }
      }
    });
  };

  return (
    <tr key={id}>
      <td className="p-1 text-slate-500">{name}</td>
      <td className="p-1 text-slate-500">{lastname}</td>
      <td className="p-1 text-slate-500">{company}</td>
      <td className="p-1 text-slate-500">{email}</td>
      <td className="p-1 text-slate-500">{phone}</td>
      <td className="p-1 text-slate-500">
        <button
          onClick={handleDeleteClient}
          className="mb-1 py-1 px-2 bg-red-600 text-white rounded-md uppercase flex justify-between items-center text-sm uppercase font-bold"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <button
          className="mb-1 py-1 px-2 bg-blue-600 text-white rounded-md uppercase flex justify-between items-center text-sm uppercase font-bold"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default ClientItem;
