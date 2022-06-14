import React, { useState } from 'react';
import {
  ImageList,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Box,
  CircularProgress,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ArtFeedItem } from '../types/ArtFeedItem';
import ArtFeedItemView from './ArtFeedItem';

export interface ArtFeedListProps {
  isLoading: boolean;
  items: Array<ArtFeedItem>;
}

const ArtFeedList = (props: ArtFeedListProps) => {
  const [selectedItem, setSelectedItem] = useState<ArtFeedItem | null>(null);

  return (
    <Box>
      {props.isLoading && (
        <Box
          data-testid="loading"
          my={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!props.isLoading && (
        <>
          <ImageList data-testid="imageList">
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Prints</ListSubheader>
            </ImageListItem>
            {props.items.map((item) => (
              <ImageListItem key={item.title} data-testid="imageItem">
                <img src={item.images[0].baseimageurl} alt={item.title} />
                <ImageListItemBar
                  title={`${item.title} - ${item.dated}`}
                  subtitle={item.people[0].displayname}
                  actionIcon={
                    <IconButton
                      data-testid={`infoButton-${item.title}`}
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`see info about ${item.title}`}
                      onClick={() => {
                        setSelectedItem(item);
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
          <ArtFeedItemView
            item={selectedItem}
            handleClose={() => setSelectedItem(null)}
          ></ArtFeedItemView>
        </>
      )}
    </Box>
  );
};

export default ArtFeedList;
