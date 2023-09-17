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
import { varFade, MotionViewport } from 'src/components/animate';
import getVariant from 'src/components/animate/variants/get-variant';
import AutoMaintenance from 'src/sections/landing/tabs/auto-maintenance';
import FeaturedProperty from 'src/sections/landing/tabs/featured-property';
import SpotlightVehicles from 'src/sections/landing/tabs/spotlight-vehicles';

function HandPicked() {
  const [currentTab, setCurrentTab] = useState('Auto Repair Services');
  const mdUp = useResponsive('up', 'md');

  const TABS = [
    {
      value: 'Auto Repair Services',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <AutoMaintenance />,
      siteUrl: '#',
    },
    {
      value: 'Most Ordered Spare Parts',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpareParts />,
      siteUrl: '#',
    },
    {
      value: 'Spotlight Vehicles',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpotlightVehicles />,
      siteUrl: '#',
    },
    {
      value: 'Featured Property',
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <FeaturedProperty />,
      siteUrl: '#',
    },
  ];

  return (
    <Box>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack
          component={MotionViewport}
          direction="column"
          alignItems="left"
          justifyContent={{ xs: 'left', md: 'space-between' }}
          sx={{
            mb: 1,
            textAlign: 'left',
            //   maxWidth: { md: '65%' },
          }}
        >
          <m.div variants={varFade().inLeft}>
            <Typography variant="overline" color="primary">
              What we offer
            </Typography>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Typography variant="h1">A Glance from our companies</Typography>
          </m.div>
        </Stack>

        <>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons={!mdUp}
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 1,
              display: 'flex',
              bgcolor: 'primary.lighter',
              justifyContent: 'space-between',
            }}
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
                  // sx={{ minHeight: 450, p: 3, border: 'solid 3px #000', borderRadius: 3 }}
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
