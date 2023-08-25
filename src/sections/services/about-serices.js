import { Stack, Container, Typography } from '@mui/material';

export default function AboutServices() {
  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={2} textAlign="center">
        <Typography variant="h1">Auto Repair Services</Typography>
      </Stack>

      {/* <Image
        src="assets/images/hero/car-services-2.png"
        sx={{ borderRadius: 2, border: `solid 2px ${theme.palette.primary.main}`, mt: 4 }}
      /> */}
    </Container>
  );
}
