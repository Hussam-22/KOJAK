import PropTypes from 'prop-types';
import { ThemeContext } from '@emotion/react';

import { Box, alpha, Stack, Button, useTheme, Container, Typography } from '@mui/material';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';

import Logo from 'src/components/logo';
import Image from 'src/components/image/Image';
import { _groupHistory } from 'src/_mock/_hisotry';
import { useResponsive } from 'src/hooks/use-responsive';

const PRACTICE = [
  { title: 'Spare-Parts', icon: 'spare-parts-icon' },
  { title: 'Repair Shop', icon: 'auto-icon' },
  { title: 'Dealership', icon: 'exclusive-icon' },
  { title: 'Property', icon: 'building-icon' },
];

function History() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl" sx={{ position: 'relative', pt: 8 }}>
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 2,
          }}
        >
          {PRACTICE.map((item) => (
            <Box
              sx={{
                px: 1,
                py: 3,
                border: `solid 2px ${theme.palette.secondary.light}`,
                borderRadius: 3,
                maxWidth: 150,
                maxHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src={`/assets/illustrations/${item.icon}.svg`} width={48} height={48} />
              <Typography
                key={item.title}
                variant="h6"
                sx={{
                  p: 1,
                  color: 'common.black',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        <Stack
          direction="column"
          spacing={2}
          alignItems="left"
          justifyContent={{ xs: 'left', md: 'space-between' }}
          sx={{
            textAlign: 'left',
            bgcolor: 'primary.lighter',
            p: 3,
            borderRadius: 3,
            mb: 6,
            borderBottom: `solid 4px`,
            borderImage: `linear-gradient(to left, ${theme.palette.secondary.main} 10%, transparent 50%) 100% 1`,
          }}
        >
          <Typography variant="overline" color="secondary">
            Our Journey
          </Typography>
          <Typography variant="h1">Pioneering Excellence in Mercedes-Benz Since 1983</Typography>

          <Typography variant="h4" sx={{ fontWeight: theme.typography.fontWeightLight }}>
            In the vibrant year of 1983, a vision emerged, a vision that would lead to a
            conglomerate renowned for its unwavering dedication to excellence and innovation. The
            Kojak Group, our modest beginnings, marked the inception of a remarkable journey that
            would span decades, all centered around one marque - Mercedes-Benz.
          </Typography>
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
                <TimelineOppositeContent>
                  <Image
                    src={value.coverUrl}
                    ratio="16/9"
                    sx={{
                      borderRadius: 1,
                      // border: `solid 2px`,
                      // borderColor: `${COLORS[index]}.main`,
                      // borderColor: `grey.400`,
                      mb: 5,
                    }}
                  />
                </TimelineOppositeContent>
              )}
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent>
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="h5" color="primary">
                      {value.year}
                    </Typography>

                    <Typography variant="h3">{value.title}</Typography>
                  </Box>

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
                      <Button variant="outlined" size="large" sx={{ mt: 1 }}>
                        {value.buttonText}
                      </Button>
                    </Box>
                  )}
                </Stack>
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
