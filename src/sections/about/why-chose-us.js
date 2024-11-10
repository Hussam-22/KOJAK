import { Box, Stack, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';

const DATA = [
  {
    icon: 'solar:money-bag-outline', // You can specify the actual icon name or URL here
    description:
      'We believe in delivering not only quality but also affordability. With our best price guarantee, you can trust that you are getting the most competitive prices for your Mercedes spare parts without sacrificing quality.',
    title: 'Best Price Guarantee',
    bgcolor: 'primary.main',
    color: 'common.white',
  },
  {
    icon: 'lets-icons:check-fill', // You can specify the actual icon name or URL here
    description: `At Kojak Spare Parts, we take pride in offering only genuine spare parts for your Mercedes-Benz. Our commitment to authenticity ensures that your vehicle's performance and safety are never compromised.`,
    title: 'Genuine Spare Parts',
    bgcolor: 'background.opposite',
    color: 'text.opposite',
  },
  {
    icon: 'la:shipping-fast', // You can specify the actual icon name or URL here
    description:
      'Time is of the essence when your vehicle needs repairs. We offer fast delivery and international shipping options, ensuring that your required Mercedes-Benz spare parts reach you promptly, no matter where you are.',
    title: 'Fast Delivery & International Shipping',
    bgcolor: 'info.main',
    color: 'common.white',
  },
  {
    icon: 'basil:headset-outline', // You can specify the actual icon name or URL here
    description:
      'Our dedicated customer support team is here to assist you at every step. We are responsive and ready to provide expert guidance, ensuring your experience with us is smooth and satisfying.',
    title: 'Responsive Customer Support',
    bgcolor: 'background.default',
  },
];

function WhyChoseUs() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container maxWidth="xl" sx={{ py: 8, px: mdUp ? 'unset' : 4 }}>
        <Typography variant="overline" color="primary">
          Why Choose Us
        </Typography>
        <Typography variant="h1" sx={{ mb: 8 }}>
          Why Choose Kojak Spare Parts
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
          }}
        >
          {DATA.map((item, index) => (
            <Box
              key={item.icon}
              sx={{
                p: 3,
                bgcolor: item.bgcolor,
                color: item?.color || 'unset',
                borderRadius:
                  (index === 0 && mdUp && '18px 0 0 18px') ||
                  (index === 3 && mdUp && '0 18px 18px 0'),
              }}
            >
              <Stack spacing={2}>
                <Iconify
                  icon={item.icon}
                  width={75}
                  height={75}
                  sx={{ color: item?.color || 'unset' }}
                />
                <Typography variant="h3">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
export default WhyChoseUs;
// WhyChoseUs.propTypes = {tables: PropTypes.array,};
