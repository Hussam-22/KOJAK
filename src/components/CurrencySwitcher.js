import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Label from 'src/components/label';
import { useResponsive } from 'src/hooks/use-responsive';
import { rdxSetCurrency } from 'src/redux/slices/siteStore';

const CURRENCY_KEY = 'selectedCurrency';
const CURRENCIES = [
  { code: 'AED', label: 'AED (د.إ)', rate: 1 },
  { code: 'USD', label: 'USD ($)', rate: 3.65 },
];

export default function CurrencySwitcher({ onChange }) {
  const [currency, setCurrency] = useState(CURRENCIES[0].code);
  const dispatch = useDispatch();
  const mdUp = useResponsive('down', 'md');

  useEffect(() => {
    const stored = localStorage.getItem(CURRENCY_KEY);
    if (stored && CURRENCIES.some((c) => c.code === stored)) {
      setCurrency(stored);
      dispatch(
        rdxSetCurrency({
          code: stored,
          label: CURRENCIES.find((c) => c.code === stored).label,
          rate: CURRENCIES.find((c) => c.code === stored).rate,
        })
      );
      if (onChange) onChange(stored);
    }
  }, [onChange, dispatch]);

  const handleChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    dispatch(
      rdxSetCurrency({
        code: newCurrency,
        label: CURRENCIES.find((c) => c.code === newCurrency).label,
        rate: CURRENCIES.find((c) => c.code === newCurrency).rate,
      })
    );
    console.log(`Currency changed to: ${newCurrency}`);

    localStorage.setItem(CURRENCY_KEY, newCurrency);
    if (onChange) onChange(newCurrency);
  };

  const switchCurrency = () => {
    const nextIndex = (CURRENCIES.findIndex((c) => c.code === currency) + 1) % CURRENCIES.length;
    const nextCurrency = CURRENCIES[nextIndex].code;
    handleChange({ target: { value: nextCurrency } });
  };

  return (
    <Label
      color="success"
      onClick={switchCurrency}
      sx={{ cursor: 'pointer', fontSize: mdUp ? '1rem' : '0.875rem' }}
    >
      {currency}
    </Label>
  );
}

CurrencySwitcher.propTypes = {
  onChange: PropTypes.func,
};

/* <Select
      value={currency}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Currency' }}
      size="small"
      sx={{ padding: 0, margin: 0 }}
    >
      {CURRENCIES.map((c) => (
        <MenuItem key={c.code} value={c.code}>
          {c.label}
        </MenuItem>
      ))}
    </Select> */
