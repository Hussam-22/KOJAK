import { Box, Stack, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import GroupCard from 'src/sections/components/group-card';

const GROUPS = [
  {
    img: 'k-exclusive',
    imgMobile: 'car-6-sm',
  },
  {
    img: 'spare-parts',
    imgMobile: 'car-7-sm',
  },
];

export default function GroupAd() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: 'url(/assets/shape/bbblurry.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Typography variant="h2">{translate('groupAd.title')}</Typography>
          <Typography
            sx={{ fontWeight: theme.typography.fontWeightLight, mb: 4, width: { md: '82%' } }}
          >
            {translate('groupAd.description')}
          </Typography>

          <Grid container spacing={5}>
            {GROUPS.map((group, index) => (
              <Grid md={6} xs={12} key={group.img} sx={{ px: 2 }}>
                <GroupCard
                  title={group.title}
                  description={group.description}
                  img={group.img}
                  imgMobile={group.imgMobile}
                  index={index}
                  horizontal
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
