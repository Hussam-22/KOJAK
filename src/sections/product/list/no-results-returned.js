import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function NoResultsReturned({ text, illustration }) {
  return (
    <Box sx={{ py: 2 }}>
      <Stack alignItems="center">
        <Image src={illustration} width={128} height={128} />
        <Typography variant="h2">{text}</Typography>
      </Stack>
    </Box>
  );
}
export default NoResultsReturned;

NoResultsReturned.propTypes = { text: PropTypes.string, illustration: PropTypes.string };
