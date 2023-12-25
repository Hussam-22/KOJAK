import { Card, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';

export default function PropertyDetailsContactCard() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4">Agent Contact Details</Typography>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="ph:user-duotone" />
          <Typography>Mr. Mohammed</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ph:phone-duotone" />
          <Typography>0529242623</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="entypo:email" />
          <Typography>mohammed@kojak-group.com</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
