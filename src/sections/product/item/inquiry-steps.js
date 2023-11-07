import * as React from 'react';

import { Box, Stack, Divider, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const steps = [
  { title: 'Search', icon: 'bi:search', color: 'info.main' },
  { title: 'Add To Cart', icon: 'solar:cart-plus-broken', color: 'primary.main' },
  { title: 'Send Parts List', icon: 'iconamoon:send', color: 'warning.main' },
  { title: 'Receive a Callback', icon: 'simple-line-icons:call-in', color: 'success.main' },
];

export default function InquirySteps() {
  return (
    <Box sx={{ py: 2 }}>
      <Stack
        direction="row"
        spacing={2}
        divider={
          <Divider
            flexItem
            sx={{ borderStyle: 'dashed', borderColor: (theme) => theme.palette.divider }}
            orientation="vertical"
          />
        }
      >
        {steps.map((step, index) => (
          <Stack direction="row" spacing={1} key={step.title}>
            <Typography sx={{ whiteSpace: 'nowrap' }}>
              {index + 1}- {step.title}
            </Typography>
            <Iconify icon={step.icon} sx={{ color: step.color }} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
