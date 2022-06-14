import React from 'react';
import { Pagination } from '@mui/material';

export interface ArtFeedPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function ArtFeedPagination({
  totalPages,
  page,
  onPageChange,
}: ArtFeedPaginationProps) {
  return (
    <Pagination
      color={'primary'}
      size={'large'}
      count={totalPages}
      page={page}
      onChange={(event: React.ChangeEvent<unknown>, page: number) => {
        if (onPageChange) {
          onPageChange(page);
        }
      }}
    />
  );
}

export default ArtFeedPagination;
