import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function AdminBackend() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  // Authentication check
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
      } else {
        setLocation('/');
      }
    } else {
      setLocation('/auth');
    }
  }, [setLocation]);

  // UI với header, navigation và content area
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header với logo và user info */}
      {/* Main content với 3 module cards */}
    </div>
  );
}