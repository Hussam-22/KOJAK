import PropTypes from 'prop-types';

import { Box, Link, Card, Stack, Divider, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

function CareerListCard({ jobDetails }) {
  const { currentLang } = useLocales();
  const { docID, title, department, group, contractType, salary, expiryDate } = jobDetails;

  const lastDayToApply = new Date(expiryDate).toDateString();

  return (
    <Card>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {docID}
        </Typography>
        <Link component={RouterLink} to={paths(currentLang.value).website.careerItem + docID}>
          <TextMaxLine line={1} variant="h5" color="secondary">
            {title}
          </TextMaxLine>
        </Link>
        <Stack spacing={0.5}>
          <CareerCardIcon
            icon="tabler:building"
            value={`${department} Department`}
            direction="row"
          />
          <CareerCardIcon icon="tdesign:location" value={group} direction="row" />
        </Stack>
      </Stack>
      <Divider flexItem />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CareerCardIcon icon="formkit:time" value={contractType} />
          <CareerCardIcon
            icon="dashicons:money-alt"
            value={+salary === 0 ? 'Competitive' : +salary}
          />
          <CareerCardIcon icon="uit:calender" value={lastDayToApply} />
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
