import PropTypes from 'prop-types';

import { Box, Card, Stack, Button, useTheme, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';

function GroupCard({ title, description, img, imgMobile, small }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  return (
    <Card
      sx={{
        p: { md: 3 },
        height: 1,
        bgcolor: 'grey.1000',
        display: 'flex',
        boxShadow: `-3px 3px 0 0 ${theme.palette.primary.main}`,
        flexDirection: 'row',
      }}
    >
      <Stack direction="column" sx={{ p: 3, width: { md: '60%' } }} spacing={2}>
        <Box>
          <Typography variant="h3" sx={{ color: 'primary.main' }}>
            KOJAK {title}
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

        {!mdUp && (
          <Image
            src={`/assets/images/group/${imgMobile}.jpg`}
            sx={{ borderRadius: 2 }}
            ratio="16/9"
          />
        )}
      </Stack>

      {mdUp && (
        <Image
          src={`/assets/images/group/${imgMobile}.jpg`}
          sx={{ borderRadius: 2, width: '40%' }}
          ratio="4/3"
        />
      )}
    </Card>
  );
}

export default GroupCard;

GroupCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  imgMobile: PropTypes.string,
  small: PropTypes.bool,
};
