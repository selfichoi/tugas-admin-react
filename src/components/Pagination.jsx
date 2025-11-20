import React from 'react';
import Button from './Button';

function Pagination({ page, totalPages, onPageChange }) {
  const safePage = page < 1 ? 1 : page;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
      <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
        Halaman <strong>{safePage}</strong> dari <strong>{totalPages || 1}</strong>
      </span>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <Button 
          variant="secondary" 
          onClick={() => {
            if (page > 1) onPageChange(page - 1);
          }}
          disabled={page <= 1} 
          style={{ 
            opacity: page <= 1 ? 0.5 : 1, 
            cursor: page <= 1 ? 'not-allowed' : 'pointer' 
          }}
        >
          &laquo; Prev
        </Button>

        <Button 
          variant="secondary" 
          onClick={() => {
            if (page < totalPages) onPageChange(page + 1);
          }}
          disabled={page >= totalPages}
          style={{ 
            opacity: page >= totalPages ? 0.5 : 1, 
            cursor: page >= totalPages ? 'not-allowed' : 'pointer' 
          }}
        >
          Next &raquo;
        </Button>
      </div>
    </div>
  );
}

export default Pagination;