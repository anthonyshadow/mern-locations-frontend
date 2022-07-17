import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Anthony Shadowitz',
      image:
        'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F018%2F385%2FRs_634x1024-130605092844-634.DespMe2.mh.060513.jpg',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
