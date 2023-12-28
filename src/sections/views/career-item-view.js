import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Stack, Skeleton, Container } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import WhyWorkWithUs from 'src/sections/career/item/why-work-with-us';
import CareerItemBody from 'src/sections/career/item/career-item-body';
import CareerItemHeader from 'src/sections/career/item/career-item-header';

function CareerItemView() {
  const { jobID } = useParams();
  const loading = useBoolean(true);
  const [jobPost, setJobPost] = useState(undefined);
  const { getJobPostDetails } = useAuthContext();

  useEffect(() => {
    (async () => {
      setJobPost(await getJobPostDetails(jobID));
      loading.onFalse();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      {jobPost === undefined ? (
        <Skeleton variant="rectangular" width={400} height={400} />
      ) : (
        <Stack spacing={3}>
          <CareerItemHeader jobPostDetails={jobPost} />
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
