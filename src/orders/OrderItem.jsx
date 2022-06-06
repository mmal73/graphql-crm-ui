import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`;
const orderStatus = {
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};
const OrderItem = ({ order }) => {
  const {
    id,
    client: { id: clientID, name, lastname },
    status,
    total,
  } = order;

  const [orderClass, setOrderClass] = useState(
    'bg-yellow-50 border-yellow-500'
  );

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      cache.modify({
        fields: {
          getOrders(existingOrderRefs, { readField }) {
            return existingOrderRefs.filter(
              (OrderRef) => id !== readField('id', OrderRef)
            );
          },
        },
      });
    },
  });
  const [updateOrder] = useMutation(UPDATE_ORDER);

  useEffect(() => {
    setCorrectOrderClass();
  }, [status]);

  const handleDeleteOrder = () => {
    Swal.fire({
      title: `Are you sure to delete this order?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteOrder({
            variables: {
              id: id,
            },
          });
          Swal.fire('Deleted!', data.deleteOrder, 'success');
        } catch (error) {
          Swal.fire('Error!', error.message, 'error');
        }
      }
    });
  };

  const setCorrectOrderClass = () => {
    if (status == 'COMPLETED') {
      setOrderClass('bg-green-50 border-green-500');
    }
    if (status == 'CANCELLED') {
      setOrderClass('bg-red-50 border-red-500');
    }
  };

  const handleChangeStatusOrder = async (status) => {
    try {
      await updateOrder({
        variables: {
          id,
          input: {
            status,
            client: clientID,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr key={id} className={'border-l-4 border-r-4 ' + orderClass}>
      <td className="p-1">
        {name} {lastname}
      </td>
      <td className="p-1">
        <select
          className="bg-blue-600 text-white rounded p-2 leading-tight  text-xs font-bold focus:outline-none focus:bg-blue-600 focus:border-blue-600"
          value={status}
          onChange={(e) => handleChangeStatusOrder(e.target.value)}
        >
          {Object.values(orderStatus).map((o_status) => (
            <option key={o_status} value={o_status}>
              {o_status}
            </option>
          ))}
        </select>
      </td>
      <td className="p-1">
        {order.order.map(({ id, name, quantity, price }) => (
          <div className="" key={id}>
            <p className="text-sm text-gray-600">
              Product:
              <span className="ml-1 font-bold">{name}</span>
            </p>
            <p className="text-sm text-gray-600">
              Quantity:
              <span className="ml-1 font-bold">{quantity}</span>
            </p>
            <p className="text-sm text-gray-600">
              Price:
              <span className="ml-1 font-bold">${price}</span>
            </p>
          </div>
        ))}
      </td>
      <td className="p-1">${total}</td>
      <td className="p-1">
        <button
          className="mb-1 py-1 px-2 bg-red-600 text-white rounded-md uppercase flex justify-between items-center text-sm uppercase font-bold"
          type="button"
          onClick={handleDeleteOrder}
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
      </td>
    </tr>
  );
};

export default OrderItem;
