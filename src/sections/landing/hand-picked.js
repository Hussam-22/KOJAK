import { useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { Tab, Box, Card, Tabs, Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { _autoRepairServices } from 'src/_mock';
import { useResponsive } from 'src/hooks/use-responsive';
import ServiceItem from 'src/sections/components/service-item';
import SpareParts from 'src/sections/landing/tabs/spare-parts';
import getVariant from 'src/components/animate/variants/get-variant';
import AutoMaintenance from 'src/sections/landing/tabs/auto-maintenance';
import FeaturedProperty from 'src/sections/landing/tabs/featured-property';
import SpotlightVehicles from 'src/sections/landing/tabs/spotlight-vehicles';

function HandPicked() {
  const [currentTab, setCurrentTab] = useState('Auto Maintenance');
  const mdUp = useResponsive('up', 'md');

  const TABS = [
    {
      value: 'Auto Maintenance',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <AutoMaintenance />,
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
      component: <FeaturedProperty />,
    },
  ];

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 8 }}>
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
          <Typography variant="h5">What we offer</Typography>
          <Typography variant="h2">A Glance from our companies</Typography>
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
                  sx={{ minHeight: 450 }}
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
