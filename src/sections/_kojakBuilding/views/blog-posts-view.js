import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Typography } from '@mui/material';

import { _posts } from 'src/_mock';

import PostsMasonry from '../../blog/kojak/posts-masonry';

// ----------------------------------------------------------------------

export default function BlogPostsView() {
  return (
    <Container
      sx={{
        pt: { xs: 0, md: 5 },
        pb: { xs: 8, md: 15 },
      }}
    >
      <Grid container spacing={{ md: 8 }}>
        <Grid xs={12} md={12}>
          <Stack spacing={3} textAlign="center" sx={{ mb: 5 }}>
            <Typography variant="h1">Blog Posts</Typography>
            <Typography>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum corrupti suscipit
              quae expedita dignissimos dolorum, in labore, animi praesentium veniam consequuntur
              nemo? Eaque autem sed, officiis quam ipsum amet natus!
            </Typography>
          </Stack>
          <PostsMasonry posts={_posts} />
        </Grid>
      </Grid>
    </Container>
  );
}
