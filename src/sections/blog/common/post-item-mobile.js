import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

import PostTimeBlock from './post-time-block';

// ----------------------------------------------------------------------

export default function PostItemMobile({ post, onSiderbar }) {
  const { currentLang } = useLocales();
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={post.title}
        src={post.coverUrl}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link
          component={RouterLink}
          href={paths(currentLang.value).website.blogItem + post.title.replaceAll(' ', '-')}
          color="inherit"
        >
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} color="secondary">
            {post.title}
          </TextMaxLine>
        </Link>

        <PostTimeBlock createdAt={fDate(post.createdAt)} duration={post.duration} />
      </Stack>
    </Stack>
  );
}

PostItemMobile.propTypes = {
  onSiderbar: PropTypes.bool,
  post: PropTypes.shape({
    title: PropTypes.string,
    coverUrl: PropTypes.string,
    duration: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};
