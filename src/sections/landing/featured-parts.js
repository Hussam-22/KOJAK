import React from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, Stack, Button, Divider, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

const SERVICE_KIT = [
  {
    imageUrl: '/assets/images/parts/engine-service-kit.webp',
    description: `Genuine Mercedes Service Kit E Class w213 OM654 DIESEL engine oil and filters -
  service kit`,
    partNo: 'A000121',
  },
  {
    imageUrl: '/assets/images/parts/gearbox-service-kit.webp',
    description: `Genuine Mercedes-Benz 722.9 Automatic gearbox oil (BLUE) kit for reduced friction gearbox A89 code`,
    partNo: 'A000122',
  },
  {
    imageUrl: '/assets/images/parts/brake-service-kit.webp',
    description: `Disk & Brake Pad Front/Rear Complete Service Kit - Mercedes-Benz`,
    partNo: 'A000123',
  },
  {
    imageUrl: '/assets/images/parts/ac-kit.webp',
    description: `Cabin Air Filter Cleaning Kit`,
    partNo: 'A000124',
  },
];

const BODY_ENGINE = [
  {
    imageUrl: '/assets/images/parts/engine-1.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente aperiam ab ducimus vero cum provident voluptatem.`,
    partNo: 'A000125',
  },
  {
    imageUrl: '/assets/images/parts/engine-2.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente aperiam ab ducimus vero cum provident voluptatem.`,
    partNo: 'A000126',
  },
  {
    imageUrl: '/assets/images/parts/body-kit-1.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente aperiam ab ducimus vero cum provident voluptatem.`,
    partNo: 'A000127',
  },
  {
    imageUrl: '/assets/images/parts/body-kit-2.png',
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sapiente aperiam ab ducimus vero cum provident voluptatem.`,
    partNo: 'A000128',
  },
];

function FeaturedParts() {
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 15 }}>
      <Container maxWidth="xl">
        <Stack spacing={8} divider={<Divider />}>
          <FeaturedSection
            caption="Service Kits"
            title="Experience Peak Performance with Our Premium Mercedes-Benz Service Kits"
            description={`Elevate your driving experience and ensure your Mercedes-Benz operates at its best
    with our meticulously designed service kits. Crafted to meet the exacting standards of
    Mercedes-Benz engineering, our premium kits offer a seamless blend of precision and
    quality. Maintain your luxury car's top-tier performance, all while enjoying the peace
    of mind that comes with our specialized service solutions. Explore our range of
    service kits and give your Mercedes the care it deserves.`}
            data={SERVICE_KIT}
          />

          <FeaturedSection
            caption="Body Kit & Engines"
            title="Elevate Your Mercedes-Benz with Premium Body Kits and Engine Upgrades"
            description="Discover a world of enhanced performance and style for your Mercedes-Benz with Kojak's meticulously curated selection of premium body kits and engine upgrades. Our products are sourced from reputable suppliers, ensuring both aesthetics and power are optimized. Transform your Mercedes-Benz with our body kits, offering a captivating blend of style and aerodynamics, while our engine upgrades adhere to Mercedes-Benz engineering standards to boost your vehicle's performance. Elevate your luxury car and redefine the road with Kojak. Experience the excellence your Mercedes-Benz deserves, available exclusively at Kojak."
            data={BODY_ENGINE}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default FeaturedParts;

function FeaturedSection({ caption, title, description, data }) {
  const theme = useTheme();
  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="overline" color="primary">
            {caption}
          </Typography>
          <Typography variant="h1" color="white">
            {title}
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>{description}</Typography>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
        {data.map((item, index) => (
          <Card
            key={index}
            sx={{
              height: 1,
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Image src={item.imageUrl} sx={{ borderRadius: 1 }} ratio="3/4" />
            <Typography sx={{ p: 2, alignSelf: 'center' }}>{item.description}</Typography>
            <Button variant="contained" color="primary">
              More Details
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
FeaturedSection.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.array,
};
