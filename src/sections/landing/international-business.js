import React from 'react';
import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import getVariant from 'src/components/animate/variants/get-variant';

function InternationalBusiness() {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true, // This will trigger the animation only once when the component comes into view
  });

  const animationVariants = getVariant('slideInLeft');

  return (
    <Box sx={{ py: 8, bgcolor: 'background.light' }}>
      <Container
        maxWidth="xl"
        sx={{
          p: 8,
          width: '80%',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1,
        }}
      >
        <Box component={m.div} {...animationVariants} ref={ref} style={{ opacity: inView ? 1 : 0 }}>
          <Image src="/assets/illustrations/illustration_map.svg" />
        </Box>
        <Stack spacing={3} sx={{ px: 3, width: { md: '85%' } }}>
          <Box>
            <Typography variant="overline" color="primary">
              International Business
            </Typography>
            <Typography variant="h1" sx={{ color: 'common.black' }}>
              Global Reach, Local Excellence
            </Typography>
          </Box>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              fontWeight: theme.typography.fontWeightLight,
              color: 'common.black',
            }}
            variant="h5"
          >
            {/* Your text content here */}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

InternationalBusiness.propTypes = {
  // Add your prop types here if needed
};

export default InternationalBusiness;
