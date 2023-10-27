import { Box, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
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
    title: 'group',
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
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();

  const POSITION_VALUE = () => {
    if (currentLang.value === 'ar' && mdUp) return '-190px';
    if (currentLang.value === 'ar' && !mdUp) return '-120px';
    return '190px';
  };

  const renderGroupCard = (item, index) => (
    <Box
      sx={{
        backgroundImage: `url(/assets/shape/bg-blurry.svg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 200,
        transition: '0.5s',
        '&:hover': {
          backgroundImage: `url(/assets/shape/bg-blurry-hover.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      }}
    >
      <Box
        key={item.title}
        sx={{
          p: 3,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'space-between',
          textAlign: 'left',
          flexDirection: 'column',
          height: 1,
          // bgcolor: 'common.black',
          backgroundImage: `url(/assets/illustrations/${item.icon}.svg)`,
          backgroundSize: 'contain',
          backgroundPositionX: POSITION_VALUE(),
          backgroundPositionY: '90px',
          backgroundRepeat: 'no-repeat',
          gap: 3,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Box>
          <Typography variant="overline">{translate('common.brand')}</Typography>
          <Typography variant="h3">{translate(`common.${item.title}`)}</Typography>
        </Box>

        <Box sx={{ width: { md: '60%' } }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: theme.typography.fontWeightLight,
            }}
          >
            {translate(`landing.visit.cardText.${item.title}`)}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, color: 'common.black' }}
            href={item?.link}
            target="_blank"
            rel="noopener"
            aria-label={item.ariaLabel}
          >
            {translate(`common.visitWebsite`)}
          </Button>
        </Box>
      </Box>
    </Box>
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
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
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
