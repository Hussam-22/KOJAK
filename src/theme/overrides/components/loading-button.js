/* eslint-disable no-shadow */

export const loadingButton = (theme) => ({
  MuiLoadingButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === 'soft' && {
          [`& .MuiLoadingButton-loadingIndicatorStart`]: { left: theme.spacing(1.25) }, // Example using theme spacing
          [`& .MuiLoadingButton-loadingIndicatorEnd`]: { right: theme.spacing(1.75) }, // Example using theme spacing
          ...(ownerState.size === 'small' && {
            [`& .MuiLoadingButton-loadingIndicatorStart`]: { left: theme.spacing(1) },
            [`& .MuiLoadingButton-loadingIndicatorEnd`]: { right: theme.spacing(1) },
          }),
        }),
      }),
      loadingIndicatorStart: ({ ownerState, theme }) => ({
        left: theme.spacing(1), // Adjust start position
      }),
      loadingIndicatorEnd: ({ ownerState, theme }) => ({
        right: theme.spacing(2), // Adjust end position
      }),
    },
  },
});
