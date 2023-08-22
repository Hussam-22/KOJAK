import {
  Box,
  Card,
  Stack,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import GroupCard from 'src/sections/components/group-card';

const GROUPS = [
  {
    title: 'Exclusive',
    description: `At KOJAK, we're proud to offer more than just exceptional auto repair and maintenance services. Our commitment to enhancing your automotive journey extends to providing you with an exquisite collection of Mercedes cars that embody luxury, performance, and sophistication`,
    img: 'car-6',
  },
  {
    title: 'Spare Parts',
    description: `At KOJAK, we're not just your trusted destination for automotive repairs and services; we're also your go-to source for genuine Mercedes spare parts. We believe in offering our valued customers a comprehensive solution that encompasses both top-notch auto care and access to the finest Mercedes-Benz components`,
    img: 'car-7',
  },
  {
    title: 'Auto Maintenance',
    description: `ipsum dolor sit amet consectetur adipisicing elit. Delectus rerum illum odit eveniet, eum aliquid repellendus rem, accusantium maiores, debitis asperiores culpa tenetur. Sint unde accusamus veniam architecto odit dolor.`,
    img: 'car-1',
  },
];

export default function GroupAd() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage: 'url(/assets/shape/bbblurry.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Typography variant="h2">Experience the Difference</Typography>
          <Typography
            sx={{ fontWeight: theme.typography.fontWeightLight, mb: 4 }}
          >{`At KOJAK, we're more than an auto repair shop; we're your automotive partners. Whether you need maintenance, repairs, spare parts, or a new Mercedes, you can trust us to deliver excellence and dedication. Visit us today and explore our Mercedes spare parts and car sales showroom. Discover why Mercedes-Benz enthusiasts choose KOJAK as their trusted partner in all things Mercedes-Benz.`}</Typography>

          <Grid container spacing={5} sx={{ height: 600 }}>
            {GROUPS.map((group) => (
              <Grid md={4} xs={12} key={group.title}>
                <GroupCard title={group.title} description={group.description} img={group.img} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
