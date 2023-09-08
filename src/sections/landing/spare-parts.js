import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

export default function SpareParts() {
  return (
    <GroupSection
      brand="Kojak Spare-Parts"
      backgroundURL="/assets/images/original/6.webp"
      mainText="Visit Kojak Spare-Parts Shop"
      subText="Looking for Geniun Parts for your Mercedes, Visit Kojak Spare-Parts Shop or explore our spare-parts inventory online by visiting Kojak Spare-Parts Website"
      buttonText="Visit Kojak Spare-Parts Website"
    />
  );
}

function GroupSection({ brand, backgroundURL, mainText, subText, buttonText }) {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Stack
          sx={{
            textAlign: 'center',
          }}
          spacing={3}
        >
          <Typography variant="h2">{mainText}</Typography>
          <Typography variant="body1">{subText}</Typography>

          <Box
            sx={{
              // bgcolor: 'background.paper',
              borderRadius: 2,
              px: 3,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
                gap: 1,
                my: 6,
              }}
            >
              {[...Array(8)].map((part, index) => (
                <Image
                  src={`/assets/images/parts/part-${index + 1}.webp`}
                  alt={`car-part-${index + 1}`}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ bgcolor: 'custom.spareParts' }}
              // onClick={() => navigate(paths.website.bookAppointment)}
            >
              {buttonText}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

GroupSection.propTypes = {
  brand: PropTypes.string,
  backgroundURL: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  buttonText: PropTypes.string,
};
