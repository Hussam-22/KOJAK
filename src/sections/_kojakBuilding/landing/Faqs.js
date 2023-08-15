import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Card, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const FAQ = [
  {
    question: 'What types of spaces do you offer for lease?',
    answer: `We offer a wide range of spaces for lease, including residential properties such as apartments, houses, condos, and townhouses. Additionally, we provide commercial spaces like offices, retail stores, warehouses, and more.
  `,
  },
  {
    question: `Can I schedule a viewing of the properties I'm interested in?`,
    answer: `Of course! Once you find a property that interests you, you can easily schedule a viewing through our website. Our team will coordinate with you to arrange a suitable time for the visit.`,
  },
  {
    question: `How can I get assistance during the leasing process?`,
    answer: `Our team of real estate experts is here to assist you throughout the entire leasing process. Whether you have questions about a property, need guidance on the paperwork, or require negotiation support, we're just a phone call or email away.`,
  },
  {
    question: `Are there any additional fees or hidden costs during the leasing process?`,
    answer: `We believe in transparency, and we strive to present all costs associated with leasing upfront. There are no hidden fees, and any additional charges will be clearly communicated to you.`,
  },
  {
    question: `What lease terms do you offer for residential and commercial spaces?`,
    answer: `We offer a variety of lease terms to accommodate different needs. These may include short-term leases, long-term leases, and flexible lease options. You can choose the term that best suits your requirements.`,
  },
  {
    question: `How do I initiate the leasing process once I find the ideal space?`,
    answer: `Once you've found the perfect space, simply get in touch with our team, and we'll guide you through the leasing process, helping you complete all the necessary paperwork and formalities.`,
  },
];

// ----------------------------------------------------------------------

export default function FAQs() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.lighter, overflow: 'hidden' }}>
      <Container
        sx={{
          py: 10,
        }}
        component={m.div}
        variants={varFade().inRight}
        maxWidth="xl"
      >
        <Stack direction="column" spacing={5}>
          <Box
            sx={{ maxWidth: { md: '60%', xs: '100%' }, textAlign: { md: 'left', xs: 'center' } }}
          >
            <Typography variant="h2" sx={{ color: 'common.black', mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            <Typography
              sx={{ color: 'common.black', fontWeight: theme.typography.fontWeightLight }}
            >
              Our FAQ section is where we address common questions and provide helpful answers.
              We&#39;ve compiled a list of inquiries that customers frequently ask us. Below,
              you&#39;ll find information on various topics to assist you in getting the answers you
              need.
            </Typography>
          </Box>

          <Box
            sx={{
              rowGap: 2.5,
              columnGap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {FAQ.map((faq, index) => (
              <Card sx={{ p: 3 }} key={index}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  {faq.question}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', fontWeight: theme.typography.fontWeightLight }}
                >
                  {faq.answer}
                </Typography>
              </Card>
            ))}
          </Box>
        </Stack>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h2">Join 842+ Happy Tenants</Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, typography: 'h4', mt: 2 }}
            onClick={() => navigate(paths.website.properties)}
          >
            Explore Properties
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
