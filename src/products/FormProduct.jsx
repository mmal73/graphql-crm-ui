import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const FormProduct = ({ initialValues, handleSubmit, method }) => {
  const userFields = [
    {
      name: 'name',
      title: 'Name',
      placeholder: 'Product Name',
      type: 'text',
    },
    {
      name: 'stock',
      title: 'Stock',
      placeholder: 'Product Stock',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Price',
      placeholder: 'Product Price',
      type: 'number',
    },
  ];

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    stock: yup.string().required('Stock is required'),
    price: yup.string().required('Price name is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form
          className="container mt-10 shadow-md pb-4 flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="bg-white rounded-lg z-10 flex justify-between flex-wrap w-1/3">
            {userFields.map(({ name, title, placeholder, type }) => (
              <div key={name} className="relative mb-4 w-full px-2">
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
              value={method}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default FormProduct;
