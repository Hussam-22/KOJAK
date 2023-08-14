// @mui
import PropTypes from 'prop-types';

import { Link, Stack, IconButton, Typography } from '@mui/material';

import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify/Iconify';

export default function ContactUsInfo({ light, small }) {
  return (
    <Stack
      spacing={small ? 2.5 : 5}
      alignItems="flex-start"
      sx={{ color: light ? 'common.white' : 'unset' }}
    >
      <Stack spacing={1} direction="row">
        <Iconify icon="carbon:email" width={24} />
        <Link color="inherit" variant="body2" href="mailto:querieskb@kojak-group.com">
          querieskb@kojak-group.com
        </Link>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify icon="carbon:mobile" width={24} />
        <Typography variant="body2">052 924 2623</Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify icon="tabler:device-landline-phone" width={24} />
        <Typography variant="body2">06 5334 312 EXT. 220</Typography>
      </Stack>

      <Stack spacing={1} direction="row">
        <Iconify icon="carbon:location" width={24} />

        <Typography variant="body2">
          <Link
            href="https://www.google.com/maps/place/Kojak+Group+of+Companies/@25.3253059,55.4046755,15z/data=!4m6!3m5!1s0x3e5f57dbcabe0c49:0x67452d730806d23a!8m2!3d25.3253059!4d55.4046755!16s%2Fg%2F11bbwn0zxl?entry=ttu"
            target="_blank"
            rel="noopener"
            sx={{
              color: light ? 'primary.light' : 'primary.main',
              textDecorationLine: 'underline',
            }}
          >
            Industrial Area 4, Sharjah, United Arab Emirates
          </Link>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify icon="mingcute:time-line" width={24} />

        <Typography variant="body2">9 AM to 6 PM - Saturday to Thursday</Typography>
      </Stack>

      {/* <Divider sx={{ border: 'dashed 1px #CCCCCC' }} flexItem /> */}

      <Stack spacing={1}>
        <Typography variant="overline">Follow Us</Typography>
        <Stack direction="row">
          {_socials.map((social) => (
            <Link key={social.value} href={social.path} noWrap underline="none" target="_blank">
              <IconButton color="inherit">
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
