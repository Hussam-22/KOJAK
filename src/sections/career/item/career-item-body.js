import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

import Label from 'src/components/label';

function CareerItemBody({ jobPostDetails }) {
  const { jobDescription, keyResponsibilities, jobSkills, benefits, niceToHave, languages } =
    jobPostDetails;
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid md={8} xs={12}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h3">Job Description</Typography>
            <Typography>{jobDescription}</Typography>
          </Box>

          <Box>
            <Typography variant="h3">Key Responsibilities</Typography>
            <ul>
              {keyResponsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Box>

          <Box>
            <Typography variant="h3">Nice to Have</Typography>
            <ul>
              {niceToHave.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Box>

          <Box>
            <Typography variant="h3">Job Skills</Typography>
            {jobSkills.map((skill) => (
              <Label key={skill} sx={{ mx: 1 }}>
                {skill}
              </Label>
            ))}
          </Box>
        </Stack>
      </Grid>
      <Grid md={4} xs={12}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h3">Languages</Typography>
              {languages.map((language) => (
                <Label key={language} sx={{ mx: 1 }}>
                  {language}
                </Label>
              ))}
            </Box>

            <Box>
              <Typography variant="h3">Benefits</Typography>
              <ul>
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
export default CareerItemBody;

CareerItemBody.propTypes = { jobPostDetails: PropTypes.object };
