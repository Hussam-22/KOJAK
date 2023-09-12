import { useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { Tab, Box, Card, Tabs, Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { _autoRepairServices } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import ServiceItem from 'src/sections/components/service-item';
import getVariant from 'src/components/animate/variants/get-variant';
import SpotlightVehicles from 'src/sections/landing/spotlight-vehicles';

function HandPicked() {
  const [currentTab, setCurrentTab] = useState('Auto Maintenance');
  const mdUp = useResponsive('up', 'md');

  const TABS = [
    {
      value: 'Auto Maintenance',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <AutoService />,
    },
    {
      value: 'Spare Parts',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpareParts />,
    },
    {
      value: 'Exclusive',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpotlightVehicles />,
    },
    {
      value: 'Building',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpareParts />,
    },
  ];

  return (
    <Box>
      <Container sx={{ py: 8 }}>
        <Stack
          direction="column"
          spacing={2}
          alignItems="left"
          justifyContent={{ xs: 'left', md: 'space-between' }}
          sx={{
            mb: 4,
            textAlign: 'left',
            //   maxWidth: { md: '65%' },
          }}
        >
          <Typography variant="h5" color="white">
            Hand-Picked
          </Typography>
          <Typography variant="h2" color="white">
            A Glance from our companies
          </Typography>
        </Stack>

        <>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons={!mdUp}
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 2 }} />

          {TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return (
              isMatched && (
                <Box
                  // component={m.div}
                  // {...getVariant('fadeInRight')}
                  key={tab.value}
                  id={tab.value}
                  sx={{ minHeight: 450, bgcolor: 'background.paper', borderRadius: 2 }}
                >
                  {tab.component}
                </Box>
              )
            );
          })}
        </>
      </Container>
    </Box>
  );
}
export default HandPicked;
// HandPicked.propTypes = { tables: PropTypes.array };

// ----------------------------------------------------------------------------
function AutoService() {
  return (
    <Box>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        sx={{ p: 3, justifyContent: 'space-between', textAlign: { md: 'unset', xs: 'center' } }}
      >
        <Typography variant="h3" color="white">
          Auto Repair Services
        </Typography>
        <Button variant="text" color="warning" endIcon={<Iconify icon="quill:link-out" />}>
          Visit Website
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(6,1fr)', xs: 'repeat(2,1fr)' },
          p: 2,
        }}
      >
        {_autoRepairServices
          .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
          .map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
      </Box>
    </Box>
  );
}
// ----------------------------------------------------------------------------
function SpareParts() {
  return (
    <Box>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        sx={{ p: 3, justifyContent: 'space-between', textAlign: { md: 'unset', xs: 'center' } }}
      >
        <Typography variant="h3" color="white">
          Most Ordered Parts
        </Typography>
        <Button variant="text" color="warning" endIcon={<Iconify icon="quill:link-out" />}>
          Visit Website
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
          p: 2,
          gap: 2,
        }}
      >
        {[...Array(4)].map((part, index) => (
          <Image
            key={`/assets/images/parts/part-${index + 1}.webp`}
            src={`/assets/images/parts/part-${index + 1}.webp`}
            alt={`car-part-${index + 1}`}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
// ----------------------------------------------------------------------------
