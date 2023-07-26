import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SpaceDetailsSummary({ spaceFeatures }) {
  const { area, bedrooms, bathrooms, ac, parking, cctv, security, healthClub, chequesNo } =
    spaceFeatures;

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">Space Features</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          <OverviewItem icon="tabler:ruler-measure" label="Area" text={`${area} sqft`} />

          <OverviewItem
            icon="carbon:floorplan"
            label="Bedrooms"
            text={bedrooms === 0 ? 'N/A' : `${bedrooms}`}
          />

          <OverviewItem icon="cil:shower" label="Bathrooms" text={`${bathrooms}`} />

          <OverviewItem icon="iconoir:air-conditioner" label="AC Type" text={ac} />

          <OverviewItem
            icon="tabler:parking"
            label="Parking"
            text={parking === 0 ? 'Not Available' : `${parking}`}
          />

          <OverviewItem
            icon="bx:cctv"
            label="CCTV"
            text={cctv === true ? 'Available' : 'Not Available'}
          />

          <OverviewItem
            icon="healthicons:security-worker-outline"
            label="Security"
            text={security === true ? 'Available' : 'Not Available'}
          />

          <OverviewItem
            icon="iconoir:gym"
            label="GYM / Swimming Pool"
            text={healthClub === true ? 'Available' : 'Not Available'}
          />

          <OverviewItem
            icon="material-symbols:payments-outline"
            label="Payment Terms"
            text={`${chequesNo} Cheques`}
          />
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={4}>
        <Stack>
          <Typography variant="h5">Maintenance Excellence</Typography>
          <Typography>
            With our space leasing services, you can bid farewell to the worries of maintaining your
            leased property. Our team of skilled professionals is committed to providing you with an
            immaculate and well-kept environment. Regular inspections, prompt repairs, and scheduled
            maintenance ensure that your leased space remains in optimal condition. Focus on your
            core activities while we take care of the upkeep.
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="h5">Security</Typography>
          <Typography>
            Your safety and the security of your assets are paramount to us. We&#39;ve integrated
            cutting-edge security measures into all our leased spaces. From advanced surveillance
            systems and access control to round-the-clock security personnel, we leave no stone
            unturned in safeguarding your interests. Rest easy knowing that your valuable belongings
            are protected within our secure premises.
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="h5"> Customized Payment Schedules:</Typography>
          <Typography>
            We recognize that every business operates on its own timeline. With our flexible payment
            terms, you have the freedom to choose a payment schedule that aligns perfectly with your
            financial planning. Whether you prefer monthly, quarterly, or annual payments, our team
            will work with you to create a plan that suits your budget and business cycle.
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="h5">Customizable Spaces</Typography>
          <Typography>
            We understand that one size doesn&#39;t fit all. That&#39;s why our space leasing
            services offer unparalleled flexibility. Whether you need a compact office space, a
            sprawling industrial unit, or a specialized workspace, we have a variety of options to
            suit your requirements. Customize your leased space to match your unique vision and
            operational needs. Our dedicated team will work closely with you to create an
            environment that fosters productivity and innovation.
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="h5">Prime Locations</Typography>
          <Typography>
            Location is key to any successful venture, and we understand its significance. Our
            portfolio of leased spaces spans across prime locations, providing you with easy access
            to essential amenities and a thriving business community. Enjoy the convenience of a
            strategic location that will amplify your business prospects and enhance your
            professional network.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

SpaceDetailsSummary.propTypes = {
  spaceFeatures: PropTypes.shape({
    area: PropTypes.string,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    ac: PropTypes.string,
    parking: PropTypes.number,
    cctv: PropTypes.bool,
    security: PropTypes.bool,
    healthClub: PropTypes.bool,
    chequesNo: PropTypes.number,
  }),
};

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};

// ----------------------------------------------------------------------

function HighlightItem({ label, text }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 2,
            borderRadius: 1,
            bgcolor: 'currentColor',
            mr: 1.5,
          }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}

HighlightItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};
