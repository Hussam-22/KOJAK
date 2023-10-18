import { useState } from 'react';

// @mui
import {
  Box,
  Stack,
  useTheme,
  Container,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Unstable_Grid2 as Grid,
} from '@mui/material';

// components
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CONTENTS = [
  {
    question: `What types of cars do you sell?`,
    answer: `We offer a diverse range of cars for sale, including both brand-new and pre-owned vehicles. Our inventory includes sedans, SUVs, coupes, convertibles, and more, catering to various preferences and budgets.`,
  },
  {
    question: 'Are the spare parts you provide genuine?',
    answer: `Yes, we guarantee genuine spare parts for all our customers. We source our spare parts directly from reputable manufacturers, ensuring their authenticity and compatibility with different vehicle models.`,
  },
  {
    question: 'How can I find the right spare part for my car?',
    answer: `Our knowledgeable staff is here to assist you. You can provide us with your vehicle's make, model, and specific part requirements, and we will help you find the exact spare part you need.`,
  },
  {
    question: 'Do you offer installation services for the purchased spare parts?',
    answer: `Yes, At our Kojak Auto-maintenance workshop, we offer installation services for the spare parts you purchase. Our skilled technicians are trained to handle the installation of various spare parts, ensuring proper fitment and functionality. You can rely on our expertise to efficiently and professionally install the purchased spare parts in your vehicle.`,
  },
  {
    question: 'What types of auto maintenance services do you provide?',
    answer: `We offer a comprehensive range of auto maintenance services, including routine inspections, oil changes, brake repairs, engine diagnostics, tire rotations, and more. Our skilled technicians are trained to handle various maintenance and repair tasks.`,
  },
  {
    question:
      'Can I purchase a car and avail of your auto maintenance services at the same location?',
    answer: `Yes, we provide both car sales and auto maintenance services at our conveniently located facilities. You can explore our range of cars for sale and also benefit from our professional maintenance services under one roof.`,
  },
  {
    question: 'Are there any warranty options for the cars I purchase?',
    answer: `Yes, most of our brand-new cars come with manufacturer warranties. Additionally, we may offer extended warranty options for both new and pre-owned vehicles to provide you with added peace of mind.`,
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
    <Box
      sx={{
        py: 15,
        bgcolor: 'background.neutral',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <Box>
              <Typography variant="overline" color="primary">
                FAQ
              </Typography>
              <Stack spacing={3}>
                <Typography
                  variant="h1"
                  sx={{ color: 'common.white', textAlign: { md: 'left', xs: 'center', zIndex: 9 } }}
                >
                  Frequently Asked Questions
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: theme.typography.fontWeightLight,
                  }}
                >
                  Our FAQ section is where we address common questions and provide helpful answers.
                  We&#39;ve compiled a list of inquiries that customers frequently ask us. Below,
                  you&#39;ll find information on various topics to assist you in getting the answers
                  you need.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid md={6} xs={12}>
            {CONTENTS.map((faq, index) => (
              <Accordion
                expanded={expanded === faq.question}
                onChange={handleChangeExpanded(faq.question)}
                key={index}
              >
                <AccordionSummary
                  sx={{
                    // bgcolor: 'primary.main',
                    mb: 2,
                    px: 2,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      fontWeight: theme.typography.fontWeightLight,
                    }}
                  >
                    {faq.question}
                  </Typography>

                  <Iconify
                    width={24}
                    icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
                    sx={{ color: 'primary.main' }}
                  />
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
