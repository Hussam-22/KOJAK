import { Stack, useTheme, Typography } from '@mui/material';

export default function AboutServices() {
  const theme = useTheme();
  return (
    <>
      <Stack spacing={2} textAlign="center">
        <Typography variant="h1">Auto Repair Services</Typography>
        <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
          We understand the importance of a well-maintained vehicle. Our team of skilled technicians
          is committed to keeping your car running smoothly and safely. With years of experience and
          state-of-the-art equipment, we offer a comprehensive range of auto repair and maintenance
          services to keep your vehicle in top condition.
        </Typography>
      </Stack>

      {/* <Image
        src="assets/images/hero/car-services-2.png"
        sx={{ borderRadius: 2, border: `solid 2px ${theme.palette.primary.main}`, mt: 4 }}
      /> */}
    </>
  );
}
