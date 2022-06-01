import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      lastname
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const router = useRouter();

  if (loading) return 'Loading...';
  if (error) {
    router.push('/signin');
    return (
      <div className="my-2 bg-red-100 border-l-4 border-r-4 border-red-500 text-red-700 p-1 mx-auto mt-5 text-center">
        <p>{error.message}</p>
      </div>
    );
  }

  const { name, lastname } = data.getUser;

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className="bg-slate-50 p-4 border-b flex justify-between">
      <p>Hola {`${name} ${lastname}`}</p>
      <button
        type="button"
        className="py-1 px-2 bg-red-500 text-white rounded-md uppercase"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  if (!data) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { data },
  };
}

export default Header;
