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

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { _groupHistory } from 'src/_mock/_hisotry';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';

function History() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const { translate, currentLang } = useLocales();

  const animation = (index, reverse) => {
    if (!reverse && index % 2 === 0 && currentLang.value === 'en') {
      return varFade().inLeft;
    }
    if (!reverse && index % 2 === 0 && currentLang.value === 'ar') return varFade().inRight;

    return varFade().inRight;
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Box component={MotionViewport}>
          <Stack
            direction="column"
            spacing={currentLang.value === 'en' ? 2 : 4}
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
            }}
          >
            <m.div variants={varFade().inUp}>
              <Typography variant="overline" color="primary">
                {translate('landing.journey.overline')}
              </Typography>
              <Typography variant="h1">{translate('landing.journey.title')}</Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography variant="h4" sx={{ fontWeight: theme.typography.fontWeightLight }}>
                {translate('landing.journey.text')}
              </Typography>
            </m.div>
          </Stack>
        </Box>

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
                  <m.div variants={animation(index)}>
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
                <m.div variants={animation(index)}>
                  <Stack spacing={1}>
                    <Typography variant="h5" color="primary">
                      {translate(`landing.journey.history.item${index + 1}.year`)}
                    </Typography>

                    <Typography variant="h3">
                      {' '}
                      {translate(`landing.journey.history.item${index + 1}.title`)}
                    </Typography>

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
                      {translate(`landing.journey.history.item${index + 1}.text`)}
                    </Typography>
                    {value.buttonText && (
                      <Box>
                        <Button
                          variant="contained"
                          size="large"
                          sx={{ mt: 1 }}
                          href={value.websiteLink}
                          target="_blank"
                          rel="noopener"
                        >
                          {translate(`landing.journey.history.item${index + 1}.buttonText`)}
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
