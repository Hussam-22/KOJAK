import PropTypes from 'prop-types';

import { Box, Card, Stack, Button, useTheme, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';

function GroupCard({ title, description, img }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        bgcolor: 'grey.1000',
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `-5px 5px 0 0 ${theme.palette.primary.main}`,
        p: 3,
      }}
    >
      <Stack direction="column" sx={{ flexGrow: 1, p: 3 }} spacing={2}>
        <Box>
          <Typography variant="overline">KOJAK</Typography>
          <Typography variant="h3" sx={{ color: 'primary.main' }}>
            {title}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>{description}</Typography>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Iconify icon="solar:map-arrow-up-bold-duotone" />}
          >
            Visit website
          </Button>
        </Box>
      </Stack>

      <Image src={`/assets/images/group/${img}.jpg`} sx={{ borderRadius: 2 }} />
    </Card>
  );
}

export default GroupCard;

GroupCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
};
