import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

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

  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
      maxWidth="xl"
    >
      <Grid container spacing={10} justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={8}>
          <Stack spacing={2} sx={{ mb: 5, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="overline" color="text.disabled">
              Find Answers to Your Space-Hunting Queries
            </Typography>

            <Typography variant="h2">Frequently Asked Questions</Typography>
            <Typography>
              If you have any other questions not covered in our FAQ section, feel free to contact
              us, and we&#39;ll be happy to assist you!
            </Typography>
          </Stack>

          {FAQ.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === faq.question}
              onChange={handleChangeExpanded(faq.question)}
            >
              <AccordionSummary
                sx={{
                  minHeight: 64,
                  [`& .${accordionSummaryClasses.content}`]: {
                    p: 0,
                    m: 0,
                  },
                  [`&.${accordionSummaryClasses.expanded}`]: {
                    bgcolor: 'action.selected',
                  },
                }}
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
        </Grid>

        {mdUp && (
          <Grid xs={12} md={4}>
            <Image
              alt="faqs"
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              ratio="9/16"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
