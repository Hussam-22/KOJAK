import { Container, Unstable_Grid2 as Grid } from '@mui/material';

export default function FutureProjects() {
  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
      maxWidth="xl"
    >
      <Grid container>
        <Grid>a</Grid>
      </Grid>
    </Container>
  );
}
