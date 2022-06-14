import React from 'react';
import { Backdrop, Box, Stack, Typography } from '@mui/material';
import { ArtFeedItem } from '../types/ArtFeedItem';

export interface ArtFeedItemProps {
  item: ArtFeedItem | null;
  handleClose: () => void;
}

const ArtFeedItem = ({ item, handleClose }: ArtFeedItemProps) => {
  if (!item) {
    return <div></div>;
  }

  return (
    <Backdrop
      data-testid="feedItemView"
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={item !== null}
      onClick={handleClose}
    >
      <Stack>
        <Typography
          data-testid="feedItem-title"
          align={'center'}
          variant={'h4'}
        >
          {item.title}
        </Typography>
        <Box my={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography data-testid="feedItem-century" variant={'h5'}>
            {item.century}
          </Typography>

          <Typography variant={'h5'} mx={2}>
            -
          </Typography>
          <Typography data-testid="feedItem-date" variant={'h5'}>
            {item.dated}
          </Typography>
          <Typography variant={'h5'} mx={2}>
            -
          </Typography>
          <Typography data-testid="feedItem-culture" variant={'h5'}>
            {item.culture}
          </Typography>
        </Box>

        <Box
          sx={{
            height: '75vh',
            width: '90vw',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            data-testid="feedItem-image"
            style={{ objectFit: 'contain' }}
            src={item.images[0].baseimageurl}
            alt={item.title}
          />
        </Box>
      </Stack>
    </Backdrop>
  );
};

export default ArtFeedItem;
