import PropTypes from 'prop-types';

import { Card, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';

export default function PropertyDetailsContactCard({ contactInfo }) {
  const { fullName, mobile, email } = contactInfo;
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4">Agent Contact Details</Typography>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="ph:user-duotone" />
          <Typography>Mr. {fullName}</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ph:phone-duotone" />
          <Typography>{mobile}</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="entypo:email" />
          <Typography>{email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

PropertyDetailsContactCard.propTypes = {
  contactInfo: PropTypes.shape({
    fullName: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
  }),
};
