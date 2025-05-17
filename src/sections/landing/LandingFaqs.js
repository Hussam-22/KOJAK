import { useState } from 'react';

// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

// components
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CONTENTS = [
  {
    question: 'Do you offer international shipping for Mercedes spare parts?',
    answer:
      'Yes, we provide international shipping to customers worldwide. Our global delivery services ensure you can get genuine Mercedes spare parts no matter where you are.',
  },
  {
    question: 'What types of Mercedes spare parts do you carry?',
    answer:
      'We stock a wide range of Mercedes spare parts, including engine components, body parts, electrical systems, suspension parts, and more. You can find both OEM and aftermarket options in our inventory.',
  },
  {
    question: 'Are your Mercedes spare parts genuine and authentic?',
    answer:
      'Absolutely. We take pride in offering only genuine Mercedes spare parts. We work with authorized suppliers to ensure the authenticity and quality of our products.',
  },
  {
    question: 'How can I find the right spare part for my specific Mercedes model?',
    answer:
      'You can use our user-friendly search feature on our website. Enter your Mercedes model and the part you need, and our system will guide you to the appropriate products.',
  },
  {
    question: 'Do you offer any warranties or guarantees on your spare parts?',
    answer:
      'Yes, we offer warranties on many of our products. Please check the product description or contact our customer support team for specific warranty details.',
  },
  {
    question: 'What is your return and exchange policy for Mercedes spare parts?',
    answer:
      'We have a straightforward return and exchange policy. If you receive a defective or incorrect part, please contact our customer service within 30 days of purchase for a return or exchange.',
  },
  {
    question:
      'Can I get technical assistance or guidance in installing the spare parts I purchase?',
    answer:
      'Certainly! We have a team of experienced technicians and a dedicated Mercedes auto maintenance workshop. We can offer installation services for any purchased spare parts from our spare-part shop. Feel free to reach out for assistance."',
  },
  {
    question: 'How can I contact Kojak for further inquiries or assistance?',
    answer: `You can contact us through our website's contact form, email us at "queriesksp@kojak-group.com", or call our customer support hotline at +971-52-9242722. Our dedicated team is here to assist you with any questions or concerns.`,
  },
];

// ----------------------------------------------------------------------

export default function LandingFaqs() {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 15, position: 'relative' }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ px: 1 }}>
              <Typography variant="overline" color="primary">
                FAQ
              </Typography>
              <Stack spacing={3}>
                <Typography variant="h1">Frequently Asked Questions</Typography>
                <Typography variant="h5" sx={{ fontWeight: theme.typography.fontWeightLight }}>
                  Our FAQ section is where we address common questions and provide helpful answers.
                  We&#39;ve compiled a list of inquiries that customers frequently ask us. Below,
                  you&#39;ll find information on various topics to assist you in getting the answers
                  you need.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              {CONTENTS.map((faq, index) => (
                <Accordion
                  expanded={expanded === faq.question}
                  onChange={handleChangeExpanded(faq.question)}
                  key={index}
                  sx={{
                    background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box,
              linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main}) border-box`,
                    borderRadius: 1,
                    border: `2px solid transparent`,
                  }}
                >
                  <AccordionSummary>
                    <Typography sx={{ flexGrow: 1 }}>{faq.question}</Typography>

                    <Iconify
                      width={24}
                      icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
                      sx={{ color: 'common.white' }}
                    />
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
