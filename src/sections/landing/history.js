import { useRef } from 'react';
import { m } from 'framer-motion';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';

import Image from 'src/components/image/Image';
import { _groupHistory } from 'src/_mock/_hisotry';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';

function History() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Stack
          component={MotionViewport}
          direction="column"
          spacing={2}
          alignItems="left"
          justifyContent={{ xs: 'left', md: 'space-between' }}
          sx={{
            py: 3,
            px: 5,
            mb: 6,
            textAlign: 'left',
            bgcolor: 'primary.lighter',
            borderRadius: 3,
            borderBottom: `solid 4px`,
            // borderImage: `linear-gradient(to left, ${theme.palette.secondary.main} 10%, transparent 50%) 100% 1`,
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography variant="overline" color="primary">
              Our Journey
            </Typography>
            <Typography variant="h1">Pioneering Excellence in Mercedes-Benz Since 1983</Typography>

            <Typography variant="h4" sx={{ fontWeight: theme.typography.fontWeightLight }}>
              In the vibrant year of 1983, a vision emerged, a vision that would lead to a
              conglomerate renowned for its unwavering dedication to excellence and innovation. The
              Kojak Group, our modest beginnings, marked the inception of a remarkable journey that
              would span decades, all centered around one marque - Mercedes-Benz.
            </Typography>
          </m.div>
        </Stack>

        <Timeline position={mdUp ? 'alternate' : 'right'}>
          {_groupHistory.map((value, index) => (
            <TimelineItem
              key={value.id}
              sx={{
                '&:before': {
                  ...(!mdUp && { display: 'none' }),
                },
              }}
            >
              {mdUp && (
                <TimelineOppositeContent component={MotionViewport}>
                  <m.div variants={index % 2 === 0 ? varFade().inLeft : varFade().inRight}>
                    <Image
                      src={value.coverUrl}
                      ratio="16/9"
                      sx={{
                        borderRadius: 1,
                        mb: 5,
                      }}
                    />
                  </m.div>
                </TimelineOppositeContent>
              )}
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent component={MotionViewport}>
                <m.div variants={index % 2 === 0 ? varFade().inRight : varFade().inLeft}>
                  <Stack spacing={1}>
                    <Typography variant="h5" color="primary">
                      {value.year}
                    </Typography>

                    <Typography variant="h3">{value.title}</Typography>

                    {!mdUp && (
                      <Image
                        src={value.coverUrl}
                        ratio="16/9"
                        sx={{
                          borderRadius: 1,
                          my: 2,
                        }}
                      />
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.fontWeightLight,
                        // maxWidth: { md: 360 },
                        ...(index % 2 && {
                          ml: 'auto',
                        }),
                      }}
                    >
                      {value.description}
                    </Typography>
                    {value.buttonText && (
                      <Box>
                        <Button variant="contained" size="large" sx={{ mt: 1 }}>
                          {value.buttonText}
                        </Button>
                      </Box>
                    )}
                  </Stack>
                </m.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
export default History;
// History.propTypes = { tables: PropTypes.array };
