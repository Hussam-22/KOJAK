import { useNavigate } from 'react-router';
import { useState, useCallback } from 'react';

import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Unstable_Grid2 as Grid,
  accordionSummaryClasses,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function FAQs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();

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
        py: 8,
      }}
      maxWidth="xl"
    >
      <Grid container spacing={4}>
        <Grid md={6} xs={12} sx={{ order: mdUp ? 1 : 2 }}>
          {[...Array(6)].map((_, index) => (
            <Accordion
              key={index}
              expanded={expanded === translate(`faq.${index + 1}.question`)}
              onChange={handleChangeExpanded(translate(`faq.${index + 1}.question`))}
            >
              <AccordionSummary
                sx={{
                  minHeight: 64,
                  [`& .${accordionSummaryClasses.content}`]: {
                    p: 0,
                    m: 0,
                  },
                  [`&.${accordionSummaryClasses.expanded}`]: {
                    backgroundColor: 'background.default',
                    color: 'primary.main',
                  },
                }}
              >
                <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
                  {translate(`faq.${index + 1}.question`)}
                </Typography>

                <Iconify
                  width={24}
                  icon={
                    expanded === translate(`faq.${index + 1}.question`)
                      ? 'carbon:subtract'
                      : 'carbon:add'
                  }
                />
              </AccordionSummary>

              <AccordionDetails sx={{ bgcolor: 'background.default' }}>
                <Stack direction="column" spacing={2}>
                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {translate(`faq.${index + 1}.answer`)}
                  </Typography>

                  {index === 2 && (
                    <Box>
                      <Button variant="contained" color="primary">
                        {translate(`faq.${index + 1}.buttonText`)}
                      </Button>
                    </Box>
                  )}
                  {index === 1 && (
                    <Box>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(paths(currentLang.value).website.bookAppointment)}
                      >
                        {translate(`faq.${index + 1}.buttonText`)}
                      </Button>
                    </Box>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid md={6} xs={12} sx={{ order: mdUp ? 2 : 1 }}>
          <Stack direction="column" spacing={5} sx={{ pl: { md: 4 } }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                {translate('faq.title')}
              </Typography>
              <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                {translate('faq.subTitle')}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
