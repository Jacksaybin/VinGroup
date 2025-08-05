import React from 'react';
import AdminBackend from '../components/admin/AdminBackend';

export default function AdminBackendPage() {
  return (
    <div className="admin-backend">
      <style>{`
        .admin-backend {
          /* Hide user navigation */
        }
        .admin-backend nav {
          display: none !important;
        }
      `}</style>
      <AdminBackend />
    </div>
  );
}
