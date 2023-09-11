import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import { useTheme } from '@mui/material/styles';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    step: 'stepOne',
    icon: 'ph:calendar-light',
  },
  {
    step: 'stepTwo',
    icon: 'icon-park-outline:list',
  },
  {
    step: 'stepThree',
    icon: 'ic:outline-request-quote',
  },
  {
    step: 'stepFour',
    icon: 'maki:car-repair',
  },
  {
    step: 'stepFive',
    icon: 'tdesign:money',
  },
];

const COLORS = ['primary', 'info', 'error', 'warning', 'success'];

// ----------------------------------------------------------------------

export default function ServicesHowItWork() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box>
      <Timeline position="right">
        {TIMELINES.map((value, index) => (
          <TimelineItem
            key={value.step}
            sx={{
              '&:before': {
                display: 'none',
              },
            }}
          >
            <TimelineSeparator>
              <TimelineDot color={COLORS[index]}>
                <Iconify icon={value.icon} width={32} height={32} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ pb: { xs: 1, md: 2 } }}>
              <Typography variant="overline" sx={{ color: `${COLORS[index]}.main` }}>
                {translate(`services.howItWorksSteps.${value.step}.step`)}
              </Typography>

              <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                {translate(`services.howItWorksSteps.${value.step}.title`)}
              </Typography>

              <Typography
                sx={{
                  opacity: 0.72,
                  ...(index % 2 && {
                    ml: 'auto',
                  }),
                  fontWeight: theme.typography.fontWeightLight,
                }}
              >
                {translate(`services.howItWorksSteps.${value.step}.description`)}
              </Typography>

              {index === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(paths.website.bookAppointment)}
                  sx={{ mt: 2 }}
                >
                  {translate(`common.bookAppointment`)}
                </Button>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
