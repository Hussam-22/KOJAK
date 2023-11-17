import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import SvgColor from 'src/components/svg-color';
import { useResponsive } from 'src/hooks/use-responsive';
import {
  AUTO_URL,
  SITE_NAME,
  GROUP_URL,
  BUILDING_URL,
  EXCLUSIVE_URL,
  SPARE_PART_URL,
} from 'src/config-global';

const GROUPS = [
  {
    title: 'kojak-group',
    link: GROUP_URL,
    icon: 'mercedes-logo',
    ariaLabel: 'Kojak Group Website',
  },
  {
    title: 'auto',
    link: AUTO_URL,
    icon: 'auto-icon',
    ariaLabel: 'Kojak Auto Maintenance Website',
  },
  {
    title: 'exclusive',
    link: EXCLUSIVE_URL,
    icon: 'exclusive-icon',
    ariaLabel: 'Kojak K-Exclusive Website',
  },
  {
    title: 'building',
    link: BUILDING_URL,
    icon: 'building-icon',
    ariaLabel: 'Kojak Building Website',
  },
  {
    title: 'spareparts',
    link: SPARE_PART_URL,
    icon: 'spare-parts-icon',
    ariaLabel: 'Kojak Spare-Parts Website',
  },
];

function VisitGroupsWebsite() {
  const { translate, currentLang } = useLocales();

  const renderGroupCard = (item, index) => (
    <Stack
      spacing={2}
      key={item.title}
      sx={{
        p: 3,
        borderRadius: 1,
        minHeight: 200,
        alignItems: 'left',
        justifyContent: 'space-between',
        textAlign: 'left',
        bgcolor: 'background.light',
      }}
    >
      <SvgColor src={`/assets/illustrations/${item.icon}.svg`} sx={{ width: 40, height: 40 }} />
      <Box>
        <Typography variant="overline">{translate('common.brand')}</Typography>
        <Typography variant="h3" sx={{ whiteSpace: 'nowrap' }}>
          {translate(`common.${item.title}`)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2">{translate(`landing.visit.cardText.${item.title}`)}</Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          href={item?.link}
          target="_blank"
          rel="noopener"
          aria-label={item.ariaLabel}
        >
          {translate(`common.visitWebsite`)}
        </Button>
      </Box>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', py: 15, px: 1 }}>
      <Container maxWidth="xl">
        <Typography variant="overline" color="primary">
          {translate(`landing.visit.overline`)}
        </Typography>
        <Typography variant="h1">{translate(`landing.visit.title`)}</Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', sm: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
            gap: 3,
            mt: 5,
          }}
        >
          {GROUPS.filter((website) => website.title !== SITE_NAME).map((item, index) =>
            renderGroupCard(item, index)
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default VisitGroupsWebsite;
// VisitGroupsWebsite.propTypes = { tables: PropTypes.array };
