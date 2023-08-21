import PropTypes from 'prop-types';

import { Box, Stack, useTheme, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

export default function ServiceItem({ service }) {
  const { serviceName, description, icon } = service;
  const theme = useTheme();
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Stack
          direction="column"
          sx={{ width: '80%', bgcolor: 'secondary.main', p: 2, borderRadius: '10px 0 0 10px' }}
        >
          <Typography variant="h6" color="primary">
            {serviceName}
          </Typography>
          <Typography>{description}</Typography>
        </Stack>

        <Box
          sx={{
            width: '20%',
            p: 1,
            bgcolor: theme.palette.grey[600],
            borderRadius: '0 10px 10px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={`/assets/images/service-icons/${icon}.svg`} width={65} />
        </Box>
      </Stack>
    </Box>
  );
}

ServiceItem.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  }),
};
