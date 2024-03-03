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
        <Link color="inherit" href="mailto:querieskex@kojak-group.com">
          querieskex@kojak-group.com
        </Link>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify icon="mdi:whatsapp" width={24} />
        <Typography>{WHATSAPP_MOBILE.replace('+', '')}</Typography>
      </Stack>

      {/* <Stack direction="row" spacing={1}>
        <Iconify icon="tabler:device-landline-phone" width={24} />
        <Typography>97143330533 (Dubai Branch)</Typography>
      </Stack> */}

      <Stack direction="row" spacing={1}>
        <Iconify icon="icomoon-free:mobile" width={24} />
        {/* <Typography>971529242625 (Sharjah Branch)</Typography> */}
        <Typography>{WHATSAPP_MOBILE}</Typography>
      </Stack>

      <Stack spacing={1} direction="row">
        <Box>
          <Iconify icon="carbon:location" width={24} height={24} />
        </Box>

        <Typography>
          <Link
            href="https://goo.gl/maps/qbELTLX7qB9vV8aG7"
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

      <Stack spacing={1} direction="row">
        <Box>
          <Iconify icon="carbon:location" width={24} height={24} />
        </Box>

        <Typography>
          <Link
            href="https://www.google.com/maps/place/Kojak+Group+of+Companies/@25.3253059,55.4046755,15z/data=!4m6!3m5!1s0x3e5f57dbcabe0c49:0x67452d730806d23a!8m2!3d25.3253059!4d55.4046755!16s%2Fg%2F11bbwn0zxl?entry=ttu"
            target="_blank"
            rel="noopener"
            sx={{
              color: light ? 'primary.light' : 'primary.main',
              textDecorationLine: 'underline',
            }}
          >
            {translate('contactUs.details.locationShj')}
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
