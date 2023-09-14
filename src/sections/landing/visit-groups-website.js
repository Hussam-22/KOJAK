import PropTypes from 'prop-types';

import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

const GROUPS = [
  {
    title: 'Spare Parts',
    link: '',
    description: `We understand the exceptional craftsmanship and performance that Mercedes-Benz vehicles are known for. When it comes to maintaining and repairing these luxurious automobiles, there is no room for compromise. That's why we are proud to offer a comprehensive range of genuine Mercedes-Benz spare parts and a host of services designed to keep your Mercedes-Benz running at its best.`,
  },
  {
    title: 'Auto Maintenance',
    link: '',
    description: `Your Mercedes-Benz is a symbol of luxury, innovation, and precision engineering. To ensure it continues to deliver the exceptional performance and comfort you expect, it deserves nothing less than the best in maintenance and care. Kojak Auto Maintenance is your trusted partner for all your Mercedes-Benz service needs`,
  },
  {
    title: 'K Exclusive',
    link: '',
    description: `Your journey to owning a Mercedes-Benz is a journey to luxury, performance, and unparalleled sophistication. At Kojak Dealership, we understand the unique allure of these iconic vehicles, and we are dedicated to delivering an unmatched experience to Mercedes-Benz enthusiasts. Discover why choosing Kojak Dealership is the ultimate choice for your next Mercedes-Benz purchase`,
  },
  {
    title: 'Building',
    link: '',
    description: `Your destination for premium residential and commercial properties for rent. Whether you're in search of a new home or seeking the perfect space for your business, here's why choosing the Kojak Building is the ideal choice`,
  },
];

function VisitGroupsWebsite() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
        {GROUPS.map((item, index) => (
          <Card
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
            }}
          >
            <Box>
              <Typography variant="overline" color="primary">
                KOJAK
              </Typography>
              <Typography variant="h3" color="primary">
                {item.title}
              </Typography>
            </Box>

            <Typography
              color="white"
              sx={{ fontWeight: (theme) => theme.typography.fontWeightLight }}
            >
              {item?.description}
            </Typography>

            <Button variant="soft" color="primary">
              Visit Website
            </Button>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
export default VisitGroupsWebsite;
// VisitGroupsWebsite.propTypes = { tables: PropTypes.array };
