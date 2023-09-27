import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack, Button, useTheme, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { _partsCategory } from 'src/_mock/_partsCategory';
import { rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterCategory() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);

  const isDisabled = filter.model === '';

  const onChangeCategories = (selectedCategory) => {
    if (filter.category.includes(selectedCategory)) {
      dispatch(
        rdxUpdateFilter({
          category: [...filter.category.filter((category) => category !== selectedCategory)],
        })
      );
    } else dispatch(rdxUpdateFilter({ category: [...filter.category, selectedCategory] }));
  };

  const borderColor = (category) => {
    const isSelected = filter.category.includes(category);
    return isSelected ? theme.palette.primary.main : theme.palette.divider;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${isDisabled ? 1 : 2},1fr)`,
        gap: 2,
      }}
    >
      {isDisabled && (
        <Typography variant="caption" sx={{ color: 'warning.main' }}>
          {`Select "Model/Year" to Show Categories`}
        </Typography>
      )}
      {_partsCategory
        .sort((a, b) => a.icon.localeCompare(b.icon))
        .map((option) => (
          <Stack
            component={Button}
            key={option.category}
            direction="column"
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            onClick={() => onChangeCategories(option.category)}
            sx={{
              // border: `solid 1px ${borderColor(option.category)}`,
              bgcolor: borderColor(option.category),
              p: 1,
              visibility: isDisabled ? 'hidden' : 'visible',
              opacity: isDisabled ? 0 : 1,
              transition: 'visibility 0.5s ease-out, opacity 0.5s ease-out',
            }}
          >
            <Image src={`/assets/images/icons/${option.icon}.svg`} width={36} />
            {option.category}
          </Stack>
        ))}
    </Box>
  );
}
