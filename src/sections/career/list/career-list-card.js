import PropTypes from 'prop-types';

import { Box, Link, Card, Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

function CareerListCard({ jobDetails }) {
  const { id, jobID, jobTitle, department, location, jobType, experienceYears, salary, createdAt } =
    jobDetails;
  return (
    <Card>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="caption">{jobID}</Typography>
        <Link component={RouterLink} to={paths(currentLang.value).website.careerItem + id}>
          <TextMaxLine line={1} variant="h5" color="secondary">
            {jobTitle}
          </TextMaxLine>
        </Link>
        <Stack spacing={0.5}>
          <CareerCardIcon
            icon="tabler:building"
            value={`${department} Department`}
            direction="row"
          />
          <CareerCardIcon icon="tdesign:location" value={location} direction="row" />
        </Stack>
      </Stack>
      <Divider flexItem />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CareerCardIcon icon="formkit:time" value={jobType} />
          <CareerCardIcon icon="fa6-solid:chart-line" value={`${experienceYears} Year Exp`} />
          <CareerCardIcon
            icon="dashicons:money-alt"
            value={salary === 0 ? 'Competitive' : salary}
          />
        </Stack>
      </Box>
    </Card>
  );
}
export default CareerListCard;

CareerListCard.propTypes = { jobDetails: PropTypes.object };

function CareerCardIcon({ icon, value, direction = 'column' }) {
  return (
    <Stack direction={direction} alignItems="center" spacing={1}>
      <Iconify icon={icon} />
      <Typography variant="caption">{value}</Typography>
    </Stack>
  );
}
CareerCardIcon.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
};
