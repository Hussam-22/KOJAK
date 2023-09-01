import PropTypes from 'prop-types';

import { alpha } from '@mui/system';
import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function SideBar({ featuredCars, updateIndex }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 20,
        top: '40%',
        zIndex: 2,
        background: alpha('#000000', 0.15),
        p: 2,
        borderRadius: 1,
      }}
    >
      <Stack direction="column" spacing={2}>
        {featuredCars.map((car, index) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            key={car.id}
          >
            <Typography>{car.class}</Typography>
            <Image
              src={car.coverURL.replace('1920x1080', '200x200')}
              height="5vh"
              width="6vw"
              sx={{ borderRadius: 1, cursor: 'pointer' }}
              onClick={() => updateIndex(index)}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
export default SideBar;
SideBar.propTypes = {
  updateIndex: PropTypes.func,
  featuredCars: PropTypes.array,
};
