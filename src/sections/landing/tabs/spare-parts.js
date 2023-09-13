import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';

export default function SpareParts() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        sx={{ p: 3, justifyContent: 'space-between', textAlign: { md: 'unset', xs: 'center' } }}
      >
        <Typography variant="h3" color="primary">
          Most Ordered Parts
        </Typography>
        <Button variant="text" color="warning" endIcon={<Iconify icon="quill:link-out" />}>
          Visit Website
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
          p: 2,
          gap: 2,
        }}
      >
        {[...Array(4)].map((part, index) => (
          <Image
            key={`/assets/images/parts/part-${index + 1}.webp`}
            src={`/assets/images/parts/part-${index + 1}.webp`}
            alt={`car-part-${index + 1}`}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
