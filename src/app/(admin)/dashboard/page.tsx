"use client"

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Extract query parameters using useSearchParams
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (name && email) {
      setUser({ name, email });
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: <strong>{user.email}</strong></p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Dashboard;
