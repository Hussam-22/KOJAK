import { useParams } from 'react-router';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { _posts, _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostTimeBlock from '../../blog/common/post-time-block';

// ----------------------------------------------------------------------

export default function BlogItemView() {
  const { postTitle } = useParams();
  const { title, description, duration, createdAt, favorited, author, tags, content } = _posts.find(
    (post) => post.title.replaceAll(' ', '-') === postTitle
  );

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
                { name: 'Blog', href: paths.building.blogPosts },
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
              </Stack>

              <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                <Iconify icon="carbon:share" />
              </IconButton>
            </Stack>

            <Typography variant="h5" sx={{ mb: 5 }}>
              {description}
            </Typography>

            <Markdown content={content} firstLetter />
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
