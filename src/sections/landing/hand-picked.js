import { useState } from 'react';
import { m } from 'framer-motion';

import { Tab, Box, Tabs, Stack, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import SpareParts from 'src/sections/landing/tabs/spare-parts';
import { varFade, MotionViewport } from 'src/components/animate';
import AutoMaintenance from 'src/sections/landing/tabs/auto-maintenance';
import FeaturedProperty from 'src/sections/landing/tabs/featured-property';
import SpotlightVehicles from 'src/sections/landing/tabs/spotlight-vehicles';

function HandPicked() {
  const mdUp = useResponsive('up', 'md');
  const { translate } = useLocales();
  const [currentTab, setCurrentTab] = useState(1);

  const TABS = [
    {
      index: 1,
      value: translate('landing.glance.tabs.auto'),
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <AutoMaintenance />,
      siteUrl: '#',
    },
    {
      index: 2,
      value: translate('landing.glance.tabs.spareParts'),
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpareParts />,
      siteUrl: '#',
    },
    {
      index: 3,
      value: translate('landing.glance.tabs.vehicles'),
      icon: <Iconify icon="ic:twotone-circle" width={20} height={20} />,
      component: <SpotlightVehicles />,
      siteUrl: '#',
    },
    {
      index: 4,
      value: translate('landing.glance.tabs.building'),
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
              {translate('landing.glance.overline')}
            </Typography>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Typography variant="h1">{translate('landing.glance.title')}</Typography>
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
                key={tab.index}
                label={tab.value}
                icon={tab.icon}
                value={tab.index}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 2 }} />

          {TABS.map((tab) => {
            const isMatched = tab.index === currentTab;
            return (
              isMatched && (
                <Box key={tab.index} id={tab.index}>
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
