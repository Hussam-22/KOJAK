import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useCallback } from 'react';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import Markdown from 'src/components/markdown';
import Image from 'src/components/image/Image';
import { _posts, _socials, blogPosts } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostTimeBlock from '../../blog/common/post-time-block';

// ----------------------------------------------------------------------

export default function BlogItemView() {
  const { postTitle } = useParams();
  const { title, description, duration, createdAt, favorited, author, tags, content } =
    blogPosts.find((post) => post.title.replaceAll(' ', '-') === postTitle);

  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <>
      <Divider />

      <Container sx={{ overflow: 'hidden', mb: 8 }}>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <CustomBreadcrumbs
              links={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: paths.website.blogPosts },
                { name: title },
              ]}
              sx={{ my: 5 }}
            />

            <Typography variant="h2" component="h1">
              {title}
            </Typography>

            <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ my: 5 }}>
              <Avatar src={author.avatarUrl} sx={{ width: 48, height: 48 }} />

              <Stack spacing={0.5} flexGrow={1}>
                <Typography variant="subtitle2">{author.name}</Typography>

                <PostTimeBlock createdAt={fDate(createdAt)} duration={duration} />
                <Link href={author.url} target="_blank" rel="noopener" underline="none">
                  Visit Original Post
                </Link>
              </Stack>

              <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                <Iconify icon="carbon:share" />
              </IconButton>
            </Stack>

            <Typography variant="h5" sx={{ mb: 5 }}>
              {description}
            </Typography>

            <Stack spacing={5}>
              {content.map((contentItem, index) => (
                <ContentMarkdown key={index} content={contentItem} postTitle={title} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {_socials.map((social) => (
          <MenuItem key={social.value} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            Share via {social.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

function ContentMarkdown({ content, postTitle }) {
  const { title, text, imageURL } = content;
  return (
    <Stack spacing={3}>
      {title.length !== 0 && (
        <Typography variant="h6" sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
          {title}
        </Typography>
      )}
      {text.length !== 0 && (
        <Typography variant="body1" sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
          {text}
        </Typography>
      )}
      {imageURL.length !== 0 && (
        <Image src={imageURL} alt="postTitle" ratio="4/3" sx={{ borderRadius: 1 }} />
      )}
    </Stack>
  );
}

ContentMarkdown.propTypes = {
  postTitle: PropTypes.string,
  content: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    imageURL: PropTypes.string,
  }),
};
