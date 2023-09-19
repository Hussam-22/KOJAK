import { m } from 'framer-motion';

import { Box, Card, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
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
  const { translate } = useLocales();

  const renderGroupCard = (item, index) => (
    <Card
      key={item.title}
      sx={{
        p: 3,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        flexDirection: 'column',
        minHeight: 200,
        bgcolor: 'secondary.main',
        gap: 3,
        position: 'relative',
        overflow: 'visible',
        boxShadow: `7px 7px 0 0 ${theme.palette.primary.main}`,
      }}
    >
      <Box
        key={item.title}
        sx={{
          p: 3,
          border: `solid 2px ${theme.palette.common.black}`,
          borderRadius: 2,
          maxWidth: 150,
          maxHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.light',
          position: 'absolute',
          top: -60,
        }}
      >
        <m.div variants={varFade().inUp}>
          <Image src={`/assets/illustrations/${item.icon}.svg`} width={48} height={48} />
        </m.div>
      </Box>

      <Box sx={{ mt: 4 }}>
        <m.div variants={varFade().inUp}>
          <Typography variant="overline" color="primary">
            {translate('common.brand')}
          </Typography>
          <Typography variant="h3" color="primary">
            {translate(`common.${item.title}`)}
          </Typography>
        </m.div>
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography color="white" sx={{ fontWeight: theme.typography.fontWeightLight }}>
          {translate(`landing.visit.cardText.${item.title}`)}
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          variant="soft"
          color="primary"
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
          <Typography variant="overline" color="primary">
            {translate(`landing.visit.overline`)}
          </Typography>
          <Typography variant="h1" sx={{ color: 'common.black' }}>
            {translate(`landing.visit.title`)}
          </Typography>
        </m.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
            gap: { md: 3, xs: 10 },
            mt: 12,
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
