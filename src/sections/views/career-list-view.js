/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Skeleton, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import CareerListCard from 'src/sections/career/list/career-list-card';

function CareerListView() {
  const { getCareersList } = useAuthContext();
  const [careersList, setCareersList] = useState(null);
  const { translate } = useLocales();

  useEffect(() => {
    (async () => {
      setCareersList(await getCareersList());
    })();
  }, [getCareersList]);

  return (
    <Container sx={{ py: 5 }}>
      <Stack sx={{ mb: 4 }} spacing={2}>
        <Typography variant="h1">{translate('career.title')}</Typography>
        <Typography>{translate('career.description')}</Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(3,1fr)', xs: 'repeat(1,1fr)' },
          gap: 2,
        }}
      >
        {careersList === null ? (
          [...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangle"
              height={200}
              width="100%"
              sx={{ borderRadius: 1, boxShadow: 5 }}
            />
          ))
        ) : careersList.length === 0 ? (
          <Typography variant="h5">No Career Posts Available at the Moment</Typography>
        ) : (
          careersList.map((jobDetails) => (
            <CareerListCard key={jobDetails.docID} jobDetails={jobDetails} />
          ))
        )}
      </Box>
    </Container>
  );
}
export default CareerListView;
// CareerList.propTypes = { tables: PropTypes.array };
