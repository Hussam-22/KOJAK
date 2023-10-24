import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Card, Button, useTheme, Typography } from '@mui/material';

import Label from 'src/components/label';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';
import { useLocalStorage } from 'src/hooks/use-local-storage';

// ----------------------------------------------------------------------

export default function SparePartsListViewGridItem({
  product,
  addToCartOnClickHandler,
  localStorageCart,
  sx,
  ...other
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imgUrl, setImageUrl] = useState('');
  const isInCart = localStorageCart.find(
    (storageItem) => storageItem.partNumber === product.partNumber
  );

  const getStockInfo = () => {
    if (product.stock === 0) return { text: 'OUT OF STOCK', color: 'error' };
    if (product.stock > 0 && product.stock <= 10)
      return { text: 'LIMITED STOCK', color: 'warning' };
    return { text: 'AVAILABLE', color: 'success' };
  };

  const addRemoveCartPart = () => {
    addToCartOnClickHandler(product.partNumber);
  };

  useEffect(() => {
    (async () => {
      setImageUrl(await fsGetImgDownloadUrl(product.imageName));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          '.add-to-cart': { opacity: 1 },
          // '&:hover .add-to-cart': {
          //   opacity: 1,
          // },
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Label
            color={getStockInfo().color}
            sx={{
              fontSize: 10,
              p: 1,
              position: 'absolute',
              zIndex: 10,
              borderRadius: '0 0 10px 0',
            }}
            variant="filled"
          >
            {getStockInfo().text}
          </Label>
          {product.stock !== 0 && (
            <Fab
              onClick={addRemoveCartPart}
              className="add-to-cart"
              color={isInCart ? 'error' : 'primary'}
              size="small"
              sx={{
                right: 8,
                zIndex: 9,
                bottom: 8,
                opacity: 0,
                position: 'absolute',
                transition: theme.transitions.create('opacity', {
                  easing: theme.transitions.easing.easeIn,
                  duration: theme.transitions.duration.shortest,
                }),
              }}
            >
              <Iconify icon={isInCart ? 'ph:trash' : 'carbon:shopping-cart-plus'} />
            </Fab>
          )}

          <Image
            src={imgUrl}
            sx={{
              flexShrink: 0,
              borderRadius: '2px 2px 0 0',
              bgcolor: 'background.neutral',
            }}
            ratio="4/3"
          />
        </Box>

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.id} - {product.partNumber}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.brandClass.join(' - ')}
          </Typography>
          <Box>
            <Button
              variant="text"
              sx={{
                textAlign: 'left',
                pl: 0,
                '&:hover': { textDecoration: 'underline', textDecorationColor: '#777' },
              }}
              onClick={() => navigate(paths.website.sparePartDetails + product.docID)}
            >
              <TextMaxLine line={1} color="primary">
                {product.description}
              </TextMaxLine>
            </Button>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.category} - {product.subCategory}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

SparePartsListViewGridItem.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    docID: PropTypes.string,
    id: PropTypes.number,
    itemGroup: PropTypes.string,
    partNumber: PropTypes.any,
    price: PropTypes.number,
    imageName: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    brandModel: PropTypes.array,
    brandClass: PropTypes.array,
    stock: PropTypes.number,
  }),
  sx: PropTypes.object,
  addToCartOnClickHandler: PropTypes.func,
  localStorageCart: PropTypes.array,
};
