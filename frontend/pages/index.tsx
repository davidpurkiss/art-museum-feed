import type { NextPage } from 'next';
import Head from 'next/head';

import { useQuery } from '@apollo/client';
import ArtFeedList from '../components/ArtFeedList';
import ArtFeedPagination from '../components/ArtFeedPagination';
import { useState } from 'react';
import { ArtFeedQuery } from '../types/ArtFeedItem';
import { Box, Container, Typography } from '@mui/material';

const PAGE_SIZE = 10;

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data } = useQuery(ArtFeedQuery, {
    variables: { size: PAGE_SIZE, page: currentPage },
  });

  if (error) return <p data-testid="error">Error {error.message}</p>;

  return (
    <Container maxWidth="md">
      <Head>
        <title>Art Museum Feed</title>
        <meta
          name="description"
          content="Art museum feed powered by the Harvard Art Museum API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography
        align="center"
        variant="h2"
        component="div"
        my={5}
        gutterBottom
      >
        Art Museum Feed
      </Typography>
      <Box display={'flex'} justifyContent={'center'}>
        <ArtFeedPagination
          page={currentPage}
          totalPages={loading ? 0 : data.objects.info.pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
      <ArtFeedList
        items={loading ? [] : data.objects.records}
        isLoading={loading}
      />
      <Box my={5} display={'flex'} justifyContent={'center'}>
        <ArtFeedPagination
          page={currentPage}
          totalPages={loading ? 0 : data.objects.info.pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </Container>
  );
};

export default Home;
