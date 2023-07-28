import { Box, Stack, Button, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';

export default function DidNotFindWhatYouAreLookingFor() {
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
        <Image src="/assets/kojak-building/illustration/house-property.svg" width="80%" />

        <Typography variant="h5">Did not find what you are looking for ?</Typography>
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
          >
            Drop us a message
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
