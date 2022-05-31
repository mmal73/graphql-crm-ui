import React from 'react';
import Link from 'next/link';
import Layout from '../src/layouts/Layout';

const Signup = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-center text-3xl font-bold text-blue-500">
          Sign Up
        </h1>
        <div className="container mx-auto flex justify-center">
          <div className="lg:w-1/3 bg-white rounded-lg p-8 flex flex-col mt-10 z-10 shadow-md">
            <div className="relative mb-4">
              <label
                htmlFor="name"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Email"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="lastname"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                Lastname
              </label>
              <input
                type="lastname"
                id="lastname"
                name="lastname"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Lastname"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Email"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 font-bold mb-2"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-gray-700 p-2 transition-colors duration-200 ease-in-out"
                placeholder="User Password"
              />
            </div>
            <input
              required
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
        </div>
      </Layout>
    </div>
  );
};

export default Signup;
