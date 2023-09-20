// @mui
import PropTypes from 'prop-types';

import { Box, Link, Stack, Typography, IconButton } from '@mui/material';

import { _socials } from 'src/_mock';
import { useLocales } from 'src/locales';
import { WHATSAPP_MOBILE } from 'src/config-global';
import Iconify from 'src/components/iconify/Iconify';

export default function ContactUsInfo({ light, small }) {
  const { translate } = useLocales();
  return (
    <Stack
      spacing={small ? 2.5 : 5}
      alignItems="flex-start"
      sx={{ color: light ? 'common.white' : 'unset' }}
    >
      <Stack spacing={1} direction="row">
        <Iconify icon="carbon:email" width={24} />
        <Link color="inherit" href="mailto:querieskam@kojak-group.com">
          querieskam@kojak-group.com
        </Link>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify icon="carbon:mobile" width={24} />
        <Typography>{WHATSAPP_MOBILE}</Typography>
      </Stack>

      <Stack spacing={1} direction="row">
        <Box>
          <Iconify icon="carbon:location" width={24} />
        </Box>

        <Typography>
          <Link
            href="https://goo.gl/maps/1WhqX8XrQ1cHBRJc9"
            target="_blank"
            rel="noopener"
            sx={{
              color: light ? 'primary.light' : 'primary.main',
              textDecorationLine: 'underline',
            }}
          >
            {translate('contactUs.details.location')}
          </Link>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Box>
          <Iconify icon="mingcute:time-line" width={24} />
        </Box>

        <Typography>{translate('contactUs.details.hours')}</Typography>
      </Stack>

      {/* <Divider sx={{ border: 'dashed 1px #CCCCCC' }} flexItem /> */}

      <Stack spacing={1}>
        <Typography variant="overline">{translate('contactUs.details.follow')}</Typography>
        <Stack direction="row">
          {_socials.map((social) => (
            <Link
              key={social.value}
              href={social.path}
              noWrap
              underline="none"
              target="_blank"
              aria-label={social.value}
            >
              <IconButton color="inherit" aria-label={social.value}>
                <Iconify icon={social.icon} sx={{ color: light ? 'primary.light' : 'unset' }} />
              </IconButton>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

ContactUsInfo.propTypes = {
  light: PropTypes.bool,
  small: PropTypes.bool,
};
