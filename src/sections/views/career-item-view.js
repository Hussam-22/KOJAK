import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Skeleton, Container, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import WhyWorkWithUs from 'src/sections/career/item/why-work-with-us';
import CareerItemBody from 'src/sections/career/item/career-item-body';
import CareerItemHeader from 'src/sections/career/item/career-item-header';

function CareerItemView() {
  const { jobID } = useParams();
  const [jobPost, setJobPost] = useState(undefined);
  const { getJobPostDetails } = useAuthContext();

  console.log(jobPost);

  useEffect(() => {
    (async () => {
      setJobPost(await getJobPostDetails(jobID));
    })();
  }, [getJobPostDetails, jobID]);

  return (
    <>
      {jobPost === undefined ? (
        <Skeleton variant="rectangular" width={400} height={400} />
      ) : (
        <Stack spacing={3}>
          <CareerItemHeader />
          <Container sx={{ py: 8 }}>
            <CareerItemBody jobPostDetails={jobPost} />
            <WhyWorkWithUs />
          </Container>
        </Stack>
      )}
    </>
  );
}
export default CareerItemView;

// CareerItemView.propTypes = { jobDetails: PropTypes.object };
