import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServiceDialog({ service, open, handleClose }) {
  const { translate, currentLang } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {translate(`services.items.${service.icon}.serviceName`)}
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <Typography sx={{ fontWeight: (theme) => theme.typography.fontWeightLight }}>
            {translate(`services.items.${service.icon}.description`)}
          </Typography>
          {service.serviceItems.map((serviceItem) => (
            <Stack direction="row" spacing={2} key={serviceItem.serviceName} alignItems="center">
              <Image
                src={`/assets/images/service-icons/${serviceItem.icon}.svg`}
                width={mdUp ? '5%' : '8%'}
              />
              <Typography>
                {translate(`services.items.common.${serviceItem.serviceName}`)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          {currentLang.value === 'ar' ? 'اغلاق' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ServiceDialog.propTypes = {
  service: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
