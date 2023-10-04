import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { blogPosts } from 'src/_mock';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------
export default function BlogItemView() {
  const { postTitle } = useParams();
  const { currentLang } = useLocales();
  const { title, description, content } = blogPosts.find(
    (post) => post.title.replaceAll(' ', '-') === postTitle
  );

  return (
    <>
      <Divider />

      <Container sx={{ overflow: 'hidden', mb: 8 }}>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={12}>
            <CustomBreadcrumbs
              links={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: paths(currentLang.value).website.blogPosts },
                { name: title },
              ]}
              sx={{ my: 5 }}
            />

            <Typography variant="h2" component="h1">
              {title}
            </Typography>

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
    </>
  );
}

function ContentMarkdown({ content, postTitle }) {
  const { title, text, imageURL } = content;
  const theme = useTheme();
  return (
    <Stack spacing={3}>
      {title?.length !== 0 && (
        <Typography variant="h6" sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
          {title}
        </Typography>
      )}

      {imageURL?.length !== undefined && imageURL?.length !== 0 && (
        <Image src={imageURL} alt="postTitle" ratio="4/3" sx={{ borderRadius: 1 }} />
      )}

      {text.length !== 0 && (
        <Typography
          variant="body1"
          sx={{
            textAlign: 'justify',
            whiteSpace: 'pre-line',
            fontWeight: theme.typography.fontWeightLight,
          }}
        >
          {text}
        </Typography>
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
