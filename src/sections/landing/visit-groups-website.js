import { m } from 'framer-motion';

import { Box, Card, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';
import { AUTO_URL, BUILDING_URL, EXCLUSIVE_URL } from 'src/config-global';
import { varFade, varSlide, MotionViewport } from 'src/components/animate';

const GROUPS = [
  {
    title: 'sparePart',
    link: '#',
    icon: 'spare-parts-icon',
  },
  {
    title: 'auto',
    link: AUTO_URL,
    icon: 'auto-icon',
  },
  {
    title: 'exclusive',
    link: EXCLUSIVE_URL,
    icon: 'exclusive-icon',
  },
  {
    title: 'building',
    link: BUILDING_URL,
    icon: 'building-icon',
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
    <Card
      key={item.title}
      sx={{
        p: 3,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'space-between',
        textAlign: 'left',
        flexDirection: 'column',
        minHeight: 200,
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
        <m.div variants={varFade().inUp}>
          <Typography variant="overline" color="secondary">
            {translate('common.brand')}
          </Typography>
          <Typography variant="h3" color="secondary">
            {translate(`common.${item.title}`)}
          </Typography>
        </m.div>
      </Box>

      <m.div variants={varFade().inUp} style={{ width: '60%' }}>
        <Typography
          variant="body2"
          color="secondary"
          sx={{
            fontWeight: theme.typography.fontWeightLight,
          }}
        >
          {translate(`visit.cardText.${item.title}`)}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 1 }}
          href={item?.link}
          target="_blank"
          rel="noopener"
        >
          {translate(`common.visitWebsite`)}
        </Button>
      </m.div>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container maxWidth="xl" sx={{ py: 8 }} component={MotionViewport}>
        <m.div variants={varSlide().inRight}>
          <Typography variant="h1" sx={{ color: 'common.black' }}>
            {translate(`visit.title`)}
          </Typography>
        </m.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
            gap: 3,
            mt: 5,
          }}
        >
          {GROUPS.map((item, index) => renderGroupCard(item, index))}
        </Box>
      </Container>
    </Box>
  );
}

export default VisitGroupsWebsite;
// VisitGroupsWebsite.propTypes = { tables: PropTypes.array };
