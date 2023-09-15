import PropTypes from 'prop-types';

import { Box, Card, Stack, Button, Divider, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function CareerListCard({ jobDetails }) {
  const {
    id,
    jobID,
    jobTitle,
    department,
    location,
    jobType,
    experienceYears,
    Salary: salary,
    createdAt,
  } = jobDetails;

  const postDate = new Date(createdAt.seconds * 1000);
  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption">{jobID}</Typography>
        <Typography variant="h4">{jobTitle}</Typography>
        <Typography variant="body2">{`${department} Department`}</Typography>
        <Typography variant="body2">{location}</Typography>
        <Typography variant="body2">{postDate.toDateString()}</Typography>
      </Box>
      <Divider flexItem />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption">{jobType}</Typography>
          <Typography variant="caption">{`${experienceYears} Year Exp`}</Typography>
          <Typography variant="caption">{salary === 0 ? 'Competitive' : salary}</Typography>
        </Stack>
      </Box>
    </Card>
  );
}
export default CareerListCard;

CareerListCard.propTypes = { jobDetails: PropTypes.object };
