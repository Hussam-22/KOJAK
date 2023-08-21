import { useNavigate } from 'react-router';

import { Box, Stack, Button, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';

export default function DidNotFindWhatYouAreLookingFor() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          p: 3,
          borderRadius: 1,
          border: 'dashed 1px #999999',
          textAlign: 'center',
        }}
      >
        <Image
          src="/assets/kojak-building/illustration/house-property.svg"
          width="80%"
          alt="did-not-find-what-you-are-looking-for"
        />

        <Typography variant="h5">{translate('properties.didNotFind')}</Typography>
        <Box>
          {/* <Button
              variant="contained"
              endIcon={<Iconify icon="iconamoon:send-duotone" />}
              onClick={addListing}
            >
              Add Listing
            </Button> */}

          <Button
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="iconamoon:send-duotone" />}
            onClick={() => navigate(paths.website.contactUs)}
          >
            {translate('common.dropMessage')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
