import PropTypes from 'prop-types';

import Masonry from '@mui/lab/Masonry';

import PostItem from './post-item';

// ----------------------------------------------------------------------

export default function PostsMasonry({ posts }) {
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3 }}
      spacing={4}
      defaultColumns={1}
      defaultSpacing={4}
      sx={{
        mx: { xs: 'unset', sm: 0 },
      }}
    >
      {posts.slice(0, 8).map((post, index) => (
        <PostItem key={post.id} post={post} index={index} />
      ))}
    </Masonry>
  );
}

PostsMasonry.propTypes = {
  posts: PropTypes.array,
};
