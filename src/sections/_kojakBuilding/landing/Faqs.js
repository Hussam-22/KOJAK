import { useState, useCallback } from 'react';

import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';

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
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: 'url(/assets/kojak-building/shape/bbblurry.svg)',
        backgroundSize: 'cover',
      }}
    >
      <Container
        sx={{
          pt: { xs: 5, md: 10 },
          pb: { xs: 10, md: 15 },
        }}
      >
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          spacing={2}
          sx={{ mb: 5, textAlign: 'center', alignItems: 'center', color: 'common.white' }}
        >
          <Box>
            <Typography variant="overline" color="text.disabled">
              Find Answers to Your Space-Hunting Queries
            </Typography>

            <Typography variant="h2">Frequently Asked Questions</Typography>
            <Typography sx={{ textAlign: 'center' }}>
              Our FAQ section is where we address common questions and provide helpful answers.
              We&#39;ve compiled a list of inquiries that customers frequently ask us. Below,
              you&#39;ll find information on various topics to assist you in getting the answers you
              need.
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', width: 1 }}>
            <Image
              alt="faqs"
              src="/assets/kojak-building/illustration/Question_Flatline.svg"
              // ratio="16/9"
            />
          </Box>
        </Stack>

        {FAQ.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === faq.question}
            onChange={handleChangeExpanded(faq.question)}
            sx={{ '&:before': { backgroundColor: 'unset' } }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: 'common.white',
                mb: 2,
                px: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                variant={mdUp ? 'h5' : 'h6'}
                sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}
              >
                {faq.question}
              </Typography>

              <Iconify
                width={24}
                icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
              />
            </AccordionSummary>

            <AccordionDetails>{faq.answer}</AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
