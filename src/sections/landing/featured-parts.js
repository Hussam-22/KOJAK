import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  Box,
  Link,
  Card,
  Stack,
  Button,
  Divider,
  useTheme,
  Container,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import CarouselComponent from 'src/components/carousel/carousel-component';
import getPartDescription from 'src/sections/components/getPartDescription';

const BODY_KIT = [
  'A167 BODYKIT MAYBACH C',
  'A218 BODY KIT C',
  'A166 BODYKIT GLS 63 AMG C',
  'A167 BODYKIT GLS X 167 AMG WITH REAR BUMPER C',
  'A463 BODY KIT 2019 C',
];

const ENGINE = ['A1760100400 47069KM B', 'A1780109400 B', 'A1770109102 B', 'A1330100000 B'];

function FeaturedParts() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3 } }}>
        <Stack spacing={8} divider={<Divider />}>
          <FeaturedSection
            caption="Body Kit"
            title="Experience Peak Performance with Our Premium Mercedes-Benz Service Kits"
            description={`Elevate your driving experience and ensure your Mercedes-Benz operates at its best
    with our meticulously designed service kits. Crafted to meet the exacting standards of
    Mercedes-Benz engineering, our premium kits offer a seamless blend of precision and
    quality. Maintain your luxury car's top-tier performance, all while enjoying the peace
    of mind that comes with our specialized service solutions. Explore our range of
    service kits and give your Mercedes the care it deserves.`}
            partsArray={BODY_KIT}
          />

          <FeaturedSection
            caption="Engines"
            title="Elevate Your Mercedes-Benz with Premium Body Kits and Engine Upgrades"
            description="Discover a world of enhanced performance and style for your Mercedes-Benz with Kojak's meticulously curated selection of premium body kits and engine upgrades. Our products are sourced from reputable suppliers, ensuring both aesthetics and power are optimized. Transform your Mercedes-Benz with our body kits, offering a captivating blend of style and aerodynamics, while our engine upgrades adhere to Mercedes-Benz engineering standards to boost your vehicle's performance. Elevate your luxury car and redefine the road with Kojak. Experience the excellence your Mercedes-Benz deserves, available exclusively at Kojak."
            partsArray={ENGINE}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default FeaturedParts;

function FeaturedSection({ caption, title, description, partsArray }) {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const { fsGetArrayOfParts } = useAuthContext();
  const [partsData, setPartsData] = useState([]);

  useEffect(() => {
    (async () => {
      setPartsData(await fsGetArrayOfParts(partsArray));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const partData = partsData
    .sort((a, b) => a.partData.partNumber.localeCompare(b.partData.partNumber))
    .map((item) => (
      <Card
        key={item.partData.partNumber}
        sx={{
          height: 1,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Stack spacing={2} sx={{ p: 1 }}>
          <Image
            src={item.imageUrl}
            sx={{ borderRadius: 1 }}
            ratio="3/4"
            alt={getPartDescription(item.partData)}
          />
          <Typography variant="caption" sx={{ color: theme.palette.text.disabled }}>
            {item.partData.partNumber}
          </Typography>
          <Typography sx={{ alignSelf: 'center' }}>{getPartDescription(item.partData)}</Typography>
        </Stack>

        <Link
          component={RouterLink}
          to={paths.website.sparePartDetails + item.partData.docID}
          sx={{ textDecoration: 'underline' }}
        >
          <Button variant="contained" color="primary" fullWidth>
            More Details
          </Button>
        </Link>
      </Card>
    ));

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="overline" color="primary">
            {caption}
          </Typography>
          <Typography variant="h1">{title}</Typography>
        </Box>

        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>{description}</Typography>
      </Stack>

      {mdUp ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
            gap: 2,
          }}
        >
          {partData}
        </Box>
      ) : (
        <Box sx={{ height: 1 }}>
          <CarouselComponent>{partData}</CarouselComponent>
        </Box>
      )}
    </Box>
  );
}
FeaturedSection.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  partsArray: PropTypes.array,
};
