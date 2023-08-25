import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
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
    description: `Scheduling your car service with us is a breeze. You can book an appointment online through our user-friendly booking system or simply give us a call. We understand that your time is valuable, so we'll work with you to find a convenient time slot that fits your schedule.`,
    icon: 'ph:calendar-light',
  },
  {
    step: 'STEP 2',
    title: 'Evaluation',
    description: `When you bring your vehicle to our auto shop, our experienced technicians will conduct a comprehensive evaluation. We leave no stone unturned, carefully inspecting your car to identify any issues or areas that require attention. This thorough evaluation is the first step towards getting your vehicle back in top shape.`,
    icon: 'icon-park-outline:list',
  },
  {
    step: 'STEP 3',
    title: 'Quote',
    description: `Transparency is our policy. After the evaluation, we'll provide you with a detailed, no-obligation quote for the necessary repairs or maintenance. You'll have a clear understanding of the work needed, the associated costs, and the estimated time it will take to complete the service. We believe in open communication and ensuring you're comfortable with the proposed work before moving forward.`,
    icon: 'ic:outline-request-quote',
  },
  {
    step: 'STEP 4',
    title: 'Repair',
    description: `Once you've approved the quote, our skilled technicians get to work. We use state-of-the-art equipment and high-quality parts to ensure your car receives the best possible care. Our team is dedicated to delivering top-notch service, whether it's routine maintenance or more extensive repairs.`,
    icon: 'maki:car-repair',
  },
  {
    step: 'STEP 5',
    title: 'Receive & payment',
    description: `Your vehicle is ready for you! We'll give you a call to confirm the completion of the service. Feel free to inspect the work, ask any questions, and take your car for a test drive. Once you're satisfied, it's time to settle the bill. We offer various payment options for your convenience, making the process quick and easy.`,
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
    <Box
      sx={{
        // bgcolor: 'background.secondary',
        color: 'common.white',
        py: { xs: 5, md: 8 },
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          How It Works
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mx: 'auto',
            opacity: 0.72,
            maxWidth: 480,
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
          }}
        >
          Nunc nonummy metus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.
        </Typography>

        <Timeline position={mdUp ? 'alternate' : 'right'}>
          {TIMELINES.map((value, index) => (
            <TimelineItem
              key={value.title}
              sx={{
                '&:before': {
                  ...(!mdUp && { display: 'none' }),
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot color={COLORS[index]}>
                  <Iconify icon={value.icon} width={32} height={32} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                <Typography variant="overline" sx={{ color: `${COLORS[index]}.main` }}>
                  {value.step}
                </Typography>

                <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.72,
                    maxWidth: { md: 360 },
                    ...(index % 2 && {
                      ml: 'auto',
                    }),
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
      </Container>
    </Box>
  );
}
