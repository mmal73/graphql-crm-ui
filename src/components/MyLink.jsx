import React from 'react';
import Link from 'next/link';

const MyLink = ({ name, url }) => {
  return (
    <Link href={url}>
      <a className="inline-block rounded-lg p-2 text-center border-2 border-transparent bg-blue-500 text-white">
        {name}
      </a>
    </Link>
  );
};

export default MyLink;
