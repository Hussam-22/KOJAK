import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack, Button, useTheme } from '@mui/material';

import Image from 'src/components/image/Image';
import { _partsCategory } from 'src/_mock/_partsCategory';
import { rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterCategory() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.products.filter.category);

  const onChangeCategories = (selectedCategory) => {
    if (selectedCategories.includes(selectedCategory)) {
      dispatch(
        rdxUpdateFilter({
          category: [...selectedCategories.filter((category) => category !== selectedCategory)],
        })
      );
    } else dispatch(rdxUpdateFilter({ category: [...selectedCategories, selectedCategory] }));
  };

  const borderColor = (category) => {
    const isSelected = selectedCategories.includes(category);
    return isSelected ? theme.palette.primary.main : theme.palette.divider;
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
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
              border: `solid 1px ${borderColor(option.category)}`,
              p: 1,
            }}
          >
            <Image src={`/assets/images/icons/${option.icon}.svg`} width={36} />
            {option.category}
          </Stack>
        ))}
    </Box>
  );
}
