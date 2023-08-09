import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box, Card, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Button, { buttonClasses } from '@mui/material/Button';

import { _socials } from 'src/_mock';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { navConfig } from 'src/layouts/main/config-navigation';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

const GROUPS = [
  {
    title: 'K-Exclusive',
    text: 'Buy your dream Mercedes',
    url: 'www.kojak-k-exclusive.com',
    image: 'k-exclusive',
  },
  {
    title: 'Spare Parts',
    text: 'Geniun spare parts for your Mercedes',
    url: 'www.kojak-spare-parts.com',
    image: 'spare-parts',
  },
  {
    title: 'Auto Maintenance',
    text: 'Fix your Mercedes by experts',
    url: 'kojak-auto-maintenance',
    image: 'auto-main',
  },
];

const CONTACT = [
  {
    link: 'mailto:hello@kojak-building.com',
    icon: 'carbon:email',
    text: 'hello@kojak-building.com',
  },
  { link: '', icon: 'carbon:mobile', text: '052 924 2623' },
  {
    link: 'https://www.google.com/maps/place/Kojak+Group+of+Companies/@25.3253059,55.4046755,15z/data=!4m6!3m5!1s0x3e5f57dbcabe0c49:0x67452d730806d23a!8m2!3d25.3253059!4d55.4046755!16s%2Fg%2F11bbwn0zxl?entry=ttu',
    icon: 'carbon:location',
    text: ' Industrial Area 4, Sharjah, United Arab Emirates',
  },
  { link: '', icon: 'mingcute:time-line', text: '8 AM to 6 PM - Saturday to Thursday' },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');
  const mUItheme = useTheme();

  const renderOverlay = (
    <Box
      sx={{
        backgroundColor: alpha('#000000', 0.45),
        top: 0,
        left: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  const simpleFooter = (
    <Box sx={{ borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
      <Container
        sx={{
          py: 1,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'left',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Logo single />

        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Kojak Group of Companies © 2023. All rights reserved | www.kojak-group.com
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'primary.main' }}>
          Designed by ProzEffect | hello@prozeffect.com
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box sx={{ bgcolor: 'primary.lighter' }}>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 1.5, md: 3 },
        }}
        maxWidth="xl"
      >
        <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={5}>
            <Stack spacing={2}>
              <Logo small />
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontWeight: mUItheme.typography.fontWeightLight }}
              >
                Kojak stands as a multifaceted group of companies, each specializing in a unique
                facet that collectively shapes a comprehensive automotive ecosystem. its presence in
                four distinct domains: car spare-parts, auto maintenance, the exclusive sale of
                Mercedes cars, and the versatile realm of space leasing and renting.
              </Typography>

              <Stack spacing={1}>
                {CONTACT.map((item) => (
                  <ContactItem
                    key={item.icon}
                    linkHref={item.link}
                    icon={item.icon}
                    text={item.text}
                  />
                ))}

                <Stack spacing={0}>
                  <Typography variant="h6">Social</Typography>
                  <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
                    {_socials.map((social) => (
                      <IconButton key={social.value} color="primary">
                        <Iconify icon={social.icon} />
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {!mdUp && (
            <Grid xs={7} md={2}>
              <Typography variant="h6">Kojak Group of Companies</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {GROUPS.map((group) => (
                  <Typography key={group.title} variant="body2">
                    {/* <Link component={RouterLink} href={list.path} rel="noopener">
                      {list.title}
                    </Link> */}
                    {group.title}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          )}

          <Grid xs={5} md={2}>
            <Typography variant="h6">Sitemap</Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {navConfig.map((list) => (
                <Typography key={list.title} variant="body2">
                  <Link component={RouterLink} href={list.path} rel="noopener">
                    {list.title}
                  </Link>
                </Typography>
              ))}
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={5}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Kojak Group of Companies
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  columnGap: 1,
                  height: '90%',
                }}
              >
                {GROUPS.map((group, index) => (
                  <Card
                    key={index}
                    sx={{
                      borderRadius: 0.5,
                      p: 1,
                      backgroundImage: `url(/assets/kojak-building/group/${group.image}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ my: 'auto' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'common.white',
                        }}
                      >
                        {group.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'common.white',
                          fontWeight: mUItheme.typography.fontWeightLight,
                        }}
                      >
                        {group.text}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      sx={{
                        m: 2,
                        color: 'common.white',
                        fontWeight: mUItheme.typography.fontWeightLight,
                      }}
                      endIcon={<Iconify icon="quill:link-out" />}
                    >
                      Visit Website
                    </Button>
                    {renderOverlay}
                  </Card>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ p: 1 }} />

        <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 1, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2023. All rights reserved - Kojak Group of Companies
          </Typography>

          <Link href="mailto:hello@prozeffect.com" variant="caption" sx={{ color: 'primary.main' }}>
            Designed by ProzEffect | hello@prozeffect.com
          </Link>
        </Stack>
      </Container>
    </Box>
  );

  // return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function ContactItem({ linkHref, text, icon }) {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center">
      <Iconify icon={icon} width={24} sx={{ mr: 1 }} />{' '}
      <Typography variant="body2" sx={{ fontWeight: theme.typography.fontWeightLight }}>
        {!!linkHref && (
          <Link href={linkHref} target="_blank" rel="noopener">
            {text}
          </Link>
        )}
        {!linkHref && text}
      </Typography>
    </Stack>
  );
}

ContactItem.propTypes = {
  linkHref: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};
