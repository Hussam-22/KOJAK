import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import { useTheme } from '@mui/material/styles';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    step: 'STEP 1',
    title: 'Book an Appointment',
    description: 'Use our user-friendly online booking or give us a call.',
    icon: 'ph:calendar-light',
  },
  {
    step: 'STEP 2',
    title: 'Evaluation',
    description:
      'Our experienced technicians conduct a comprehensive car evaluation to identifying issues.',
    icon: 'icon-park-outline:list',
  },
  {
    step: 'STEP 3',
    title: 'Quote',
    description:
      'After evaluation, get a detailed quote. Understand the work, costs, and time before proceeding.',
    icon: 'ic:outline-request-quote',
  },
  {
    step: 'STEP 4',
    title: 'Repair',
    description:
      'With your approval, our skilled technicians get to work using top-notch equipment and parts.',
    icon: 'maki:car-repair',
  },
  {
    step: 'STEP 5',
    title: 'Payment',
    description:
      "Your vehicle is ready! We'll call you to confirm. Inspect, test drive, and then settle the bill with our convenient payment options.",
    icon: 'tdesign:money',
  },
];

const COLORS = ['primary', 'info', 'error', 'warning', 'success'];

// ----------------------------------------------------------------------

export default function ServicesHowItWork() {
  const theme = useTheme();
  const navigate = useNavigate();

  const mdUp = useResponsive('up', 'md');

  return (
    <Box>
      <Timeline position="right">
        {TIMELINES.map((value, index) => (
          <TimelineItem
            key={value.title}
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
                {value.step}
              </Typography>

              <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                {value.title}
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
                {value.description}
              </Typography>

              {index === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(paths.website.bookAppointment)}
                  sx={{ mt: 2 }}
                >
                  Book an Appointment
                </Button>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
