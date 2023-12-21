import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useAuthContext } from 'src/auth/hooks';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';
import PropertyCardSkeleton from 'src/sections/_kojakBuilding/properties/property-card-skeleton';
import DidNotFindWhatYouAreLookingFor from 'src/sections/_kojakBuilding/properties/did-not-find-property-card';

// ----------------------------------------------------------------------

export default function PropertiesList() {
  const [spacesList, setSpacesList] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { fsGetSpaces, addNewSpace } = useAuthContext();
  const { rdxFilter } = useSelector((state) => state.properties);

  useEffect(() => {
    (async () => {
      setSpacesList(await fsGetSpaces());
    })();
  }, [fsGetSpaces]);

  console.log(spacesList);

  useEffect(() => {
    let propertiesToFilter = spacesList;

    if (rdxFilter.type.length !== 0) {
      propertiesToFilter = propertiesToFilter.filter((property) =>
        rdxFilter.type.includes(property.data.type)
      );
    }
    if (rdxFilter.spaceType.length !== 0) {
      propertiesToFilter = propertiesToFilter.filter((property) =>
        rdxFilter.spaceType.includes(property.data.spaceType.toLowerCase())
      );
    }
    if (rdxFilter.city.length !== 0) {
      propertiesToFilter = propertiesToFilter.filter((property) =>
        rdxFilter.city.includes(property.data.city.toLowerCase())
      );
    }
    if (rdxFilter.isAvailable.length !== 0) {
      propertiesToFilter = propertiesToFilter.filter((property) =>
        rdxFilter.isAvailable.includes(property.data.isAvailable)
      );
    }

    if (
      rdxFilter.type.length === 0 &&
      rdxFilter.spaceType.length === 0 &&
      rdxFilter.city.length === 0 &&
      rdxFilter.isAvailable.length === 0
    ) {
      setFilteredProperties(spacesList);
    } else {
      setFilteredProperties(propertiesToFilter);
    }
  }, [spacesList, rdxFilter.spaceType, rdxFilter.city, rdxFilter.isAvailable, rdxFilter.type]);

  return (
    <Stack spacing={4} sx={{ mb: 6 }}>
      {spacesList.length === 0 &&
        [...Array(5)].map((_, index) => <PropertyCardSkeleton key={index} />)}

      {filteredProperties.length !== 0 &&
        filteredProperties
          .sort((a, b) => b.isAvailable - a.isAvailable)
          .map((property) => <PropertyCard key={property.data.docID} space={property} />)}

      {filteredProperties.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ height: { md: '50%', xs: 'unset' }, width: { md: '50%', xs: 'unset' } }}>
            <DidNotFindWhatYouAreLookingFor />
          </Box>
        </Box>
      )}
    </Stack>
  );
}
