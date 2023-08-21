import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Typography } from '@mui/material';

import { blogPosts } from 'src/_mock';
import { useLocales } from 'src/locales';

import PostsMasonry from '../../blog/kojak/posts-masonry';

// ----------------------------------------------------------------------

export default function BlogPostsView() {
  const { translate } = useLocales();
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
            <Typography variant="h1">{translate('blog.title')}</Typography>
            <Typography>{translate('blog.subTitle')}</Typography>
          </Stack>
          <PostsMasonry posts={blogPosts} />
        </Grid>
      </Grid>
    </Container>
  );
}
