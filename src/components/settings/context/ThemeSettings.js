import PropTypes from 'prop-types';

import ThemeRtlLayout from './ThemeRtlLayout';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node,
};

export default function ThemeSettings({ children }) {
  return <ThemeRtlLayout>{children}</ThemeRtlLayout>;
}
