import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';

import PostItemMobile from '../common/post-item-mobile';

import LatestPostItem from './latest-post-item';

// ----------------------------------------------------------------------

export default function LatestPosts({ posts }) {
  const mdUp = useResponsive('up', 'md');

  const latestPost = posts[5];

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.website.blogPosts}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      View All
    </Button>
  );

  return (
    <MotionViewport disableAnimatedMobile>
      <Container
        sx={{
          pt: { xs: 5, md: 10 },
          pb: 5,
        }}
        component={m.div}
        variants={varFade().inLeft}
        maxWidth="xl"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Stack
            sx={{
              maxWidth: { md: 660 },
            }}
          >
            <Typography variant="h2" sx={{ my: 3 }}>
              Check out our Blog
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              Your go-to resource for all things related to property renting and leasing. Whether
              you&#39;re a seasoned tenant or a first-time renter, a property owner, or a curious
              observer of the real estate market, our blog is designed to provide you with valuable
              information, tips, and industry insights
            </Typography>
          </Stack>

          {mdUp && viewAllBtn}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {mdUp ? (
            <>
              <LatestPostItem post={latestPost} largePost />

              <Masonry columns={{ xs: 1, md: 2 }} spacing={4}>
                {posts.slice(1, 5).map((post, index) => (
                  <LatestPostItem key={post.id} post={post} order={index % 2} />
                ))}
              </Masonry>
            </>
          ) : (
            <>
              {posts.slice(0, 5).map((post) => (
                <PostItemMobile key={post.id} post={post} />
              ))}
            </>
          )}
        </Box>

        {!mdUp && (
          <Stack alignItems="center" sx={{ mt: 4 }}>
            {viewAllBtn}
          </Stack>
        )}
      </Container>
    </MotionViewport>
  );
}

LatestPosts.propTypes = {
  posts: PropTypes.array,
};
