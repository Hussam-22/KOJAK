import { m } from 'framer-motion';

import { Box, Card, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import getVariant from 'src/components/animate/variants/get-variant';
import { AUTO_URL, BUILDING_URL, EXCLUSIVE_URL } from 'src/config-global';
import { varFade, varSlide, MotionViewport } from 'src/components/animate';

const GROUPS = [
  {
    title: 'Spare Parts',
    link: '#',
    description: `We understand the exceptional craftsmanship and performance that Mercedes-Benz vehicles are known for. When it comes to maintaining and repairing these luxurious automobiles, there is no room for compromise. That's why we are proud to offer a comprehensive range of genuine Mercedes-Benz spare parts and a host of services designed to keep your Mercedes-Benz running at its best.`,
  },
  {
    title: 'Auto Maintenance',
    link: AUTO_URL,
    description: `Your Mercedes-Benz is a symbol of luxury, innovation, and precision engineering. To ensure it continues to deliver the exceptional performance and comfort you expect, it deserves nothing less than the best in maintenance and care. Kojak Auto Maintenance is your trusted partner for all your Mercedes-Benz service needs`,
  },
  {
    title: 'K Exclusive',
    link: EXCLUSIVE_URL,
    description: `Your journey to owning a Mercedes-Benz is a journey to luxury, performance, and unparalleled sophistication. At Kojak Dealership, we understand the unique allure of these iconic vehicles, and we are dedicated to delivering an unmatched experience to Mercedes-Benz enthusiasts. Discover why choosing Kojak Dealership is the ultimate choice for your next Mercedes-Benz purchase`,
  },
  {
    title: 'Building',
    link: BUILDING_URL,
    description: `Your destination for premium residential and commercial properties for rent. Whether you're in search of a new home or seeking the perfect space for your business, here's why choosing the Kojak Building is the ideal choice`,
  },
];

const PRACTICE = [
  { title: 'Spare-Parts', icon: 'spare-parts-icon' },
  { title: 'Repair Shop', icon: 'auto-icon' },
  { title: 'Dealership', icon: 'exclusive-icon' },
  { title: 'Property', icon: 'building-icon' },
];

function VisitGroupsWebsite() {
  const theme = useTheme();

  const renderGroupCard = (item, index) => (
    <Card
      key={item.title}
      sx={{
        p: 3,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        flexDirection: 'column',
        minHeight: 200,
        bgcolor: 'secondary.main',
        gap: 3,
        position: 'relative',
        overflow: 'visible',
        boxShadow: `7px 7px 0 0 ${theme.palette.primary.main}`,
      }}
    >
      <Box
        key={PRACTICE[index].title}
        sx={{
          p: 3,
          border: `solid 2px ${theme.palette.common.black}`,
          borderRadius: 2,
          maxWidth: 150,
          maxHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.light',
          position: 'absolute',
          top: -60,
        }}
      >
        <m.div variants={varFade().inUp}>
          <Image src={`/assets/illustrations/${PRACTICE[index].icon}.svg`} width={48} height={48} />
        </m.div>
      </Box>

      <Box sx={{ mt: 4 }}>
        <m.div variants={varFade().inUp}>
          <Typography variant="overline" color="primary">
            KOJAK
          </Typography>
          <Typography variant="h3" color="primary">
            {item.title}
          </Typography>
        </m.div>
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography color="white" sx={{ fontWeight: theme.typography.fontWeightLight }}>
          {item?.description}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          variant="soft"
          color="primary"
          sx={{ mt: 1 }}
          href={item?.link}
          target="_blank"
          rel="noopener"
        >
          Visit Website
        </Button>
      </m.div>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container maxWidth="xl" sx={{ py: 8 }} component={MotionViewport}>
        <m.div variants={varSlide().inRight}>
          <Typography variant="overline" color="primary">
            Group Websites
          </Typography>
          <Typography variant="h1" sx={{ color: 'common.black' }}>
            Visit Our Group Websites
          </Typography>
        </m.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
            gap: { md: 3, xs: 10 },
            mt: 12,
          }}
        >
          {GROUPS.map((item, index) => renderGroupCard(item, index))}
        </Box>
      </Container>
    </Box>
  );
}

export default VisitGroupsWebsite;
// VisitGroupsWebsite.propTypes = { tables: PropTypes.array };
