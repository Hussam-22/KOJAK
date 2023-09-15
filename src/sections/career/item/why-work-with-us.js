import PropTypes from 'prop-types';

import { Box, Stack, Button, Divider, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

const listItemStyle = {
  marginBottom: '15px', // Adjust the value to control the spacing
};

function WhyWorkWithUs() {
  return (
    <Stack spacing={2}>
      <Divider />
      <Typography variant="h3">Why Work With Kojak Group</Typography>
      <ul style={{}}>
        <li style={listItemStyle}>
          <strong>Innovative Environment:</strong> Kojak Group is at the forefront of innovation. We
          embrace new technologies and ideas, fostering an environment where creative thinking and
          cutting-edge solutions are not only encouraged but celebrated.
        </li>

        <li style={listItemStyle}>
          <strong>Career Growth:</strong> We believe in investing in our employees&#39; professional
          development. When you work with us, you&#39;ll have access to ongoing training, mentorship
          programs, and opportunities for advancement within the organization.
        </li>

        <li style={listItemStyle}>
          <strong>Collaborative Culture:</strong> Teamwork is at the heart of what we do. We value
          collaboration and open communication, creating a supportive atmosphere where
          everyone&#39;s ideas are valued and contributions recognized.
        </li>

        <li style={listItemStyle}>
          <strong>Diverse and Inclusive:</strong> Kojak Group is committed to diversity and
          inclusion. We recognize that diverse perspectives lead to better outcomes, and we actively
          promote an inclusive culture where everyone feels welcome and valued.
        </li>

        <li style={listItemStyle}>
          <strong>Challenging Projects:</strong> Our projects are both exciting and challenging.
          You&#39;ll have the chance to work on a variety of projects that push the boundaries of
          your skills and expertise, ensuring that your work remains engaging and fulfilling.
        </li>

        <li style={listItemStyle}>
          <strong>Work-Life Balance:</strong> We understand the importance of a healthy work-life
          balance. Our flexible working hours and generous leave policies help you maintain
          equilibrium between your professional and personal life.
        </li>

        <li style={listItemStyle}>
          <strong>Employee Benefits:</strong> Kojak Group provides a competitive benefits package,
          including medical insurance, air tickets, and other perks. We value our employees&#39;
          well-being and aim to provide a comprehensive package that supports their needs.
        </li>

        <li style={listItemStyle}>
          <strong>Community Engagement:</strong> We are committed to making a positive impact in the
          communities where we operate. You&#39;ll have opportunities to participate in corporate
          social responsibility initiatives and contribute to meaningful causes.
        </li>

        <li style={listItemStyle}>
          <strong>Global Presence:</strong> With a global presence, Kojak Group offers the chance to
          collaborate on international projects, expanding your horizons and allowing you to work
          with a diverse range of partners and clients.
        </li>

        <li style={listItemStyle}>
          <strong>Innovation for Good:</strong> At Kojak Group, we believe in using our skills and
          resources for the greater good. We actively engage in projects and initiatives that drive
          positive change in society and the environment.
        </li>
      </ul>

      <Typography>{`Joining Kojak Group means becoming part of a dynamic, forward-thinking organization that values its employees, promotes personal and professional growth, and is committed to making a difference in the world. If you're looking for a company that challenges you, supports your career goals, and fosters a culture of innovation and inclusivity, Kojak Group is the place to be.`}</Typography>
    </Stack>
  );
}
export default WhyWorkWithUs;
// WhyWorkWithUs.propTypes = { tables: PropTypes.array };
