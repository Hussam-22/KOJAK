import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';

export default function SpareParts() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
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
  );
}
