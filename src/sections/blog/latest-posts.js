import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { varFade } from 'src/components/animate';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

import LatestPostItem from './latest-post-item';
import PostItemMobile from './common/post-item-mobile';

// ----------------------------------------------------------------------

export default function LatestPosts({ posts }) {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  const { translate } = useLocales();

  const latestPost = posts[5];

  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={paths.website.blogPosts}
      color="inherit"
      endIcon={
        <Iconify
          icon={theme.direction === 'ltr' ? 'carbon:chevron-right' : 'carbon:chevron-left'}
        />
      }
    >
      {translate('common.viewAll')}
    </Button>
  );

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          pt: 10,
          pb: 15,
          mt: 5,
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
            mb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Stack
            sx={{
              maxWidth: { md: '60%', xs: 'unset' },
            }}
          >
            <Typography variant="h2" sx={{ mb: 3 }}>
              {translate('blog.title')}
            </Typography>

            <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
              {translate('blog.subTitle')}
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
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          {/* {mdUp ? (
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
        )} */}
          {posts.slice(0, 5).map((post) => (
            <PostItemMobile key={post.id} post={post} />
          ))}
        </Box>

        {!mdUp && (
          <Stack alignItems="center" sx={{ mt: 4 }}>
            {viewAllBtn}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

LatestPosts.propTypes = {
  posts: PropTypes.array,
};
