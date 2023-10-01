import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, Stack, Typography, IconButton } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServiceDialog({ service, open, handleClose }) {
  const { translate, currentLang } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ position: 'relative' }}>
        {translate(`services.items.${service.icon}.serviceName`)}
      </DialogTitle>
      <IconButton
        size="large"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleClose}
      >
        <Iconify icon="ph:x-circle-fill" width={26} height={26} sx={{ color: 'common.white' }} />
      </IconButton>
      <DialogContent sx={{ pb: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography sx={{ fontWeight: (theme) => theme.typography.fontWeightLight }}>
            {translate(`services.items.${service.icon}.description`)}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { md: 'repeat(2,1fr)', xs: 'repeat(1,1fr)' },
              gap: 1,
            }}
          >
            {service.serviceItems.map((serviceItem) => (
              <Stack direction="row" spacing={2} key={serviceItem.serviceName} alignItems="center">
                <Image src={`/assets/images/service-icons/${serviceItem.icon}.svg`} width="8%" />
                <Typography>
                  {translate(`services.items.common.${serviceItem.serviceName}`)}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </DialogContent>
      {/* <DialogActions sx={{ bgcolor: 'primary.main' }}>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          {currentLang.value === 'ar' ? 'اغلاق' : 'Close'}
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

ServiceDialog.propTypes = {
  service: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
