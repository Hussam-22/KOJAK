import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useAuthContext } from 'src/auth/hooks';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';
import PropertyCardSkeleton from 'src/sections/_kojakBuilding/properties/property-card-skeleton';

// ----------------------------------------------------------------------

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { getAllSpacesInfo, addNewSpace } = useAuthContext();
  const { rdxFilter } = useSelector((state) => state.properties);

  // const addListing = async () => {
  //   const data = await addNewSpace();
  //   console.log(data);
  // };

  useEffect(() => {
    (async () => {
      setProperties(await getAllSpacesInfo());
    })();
  }, [getAllSpacesInfo]);

  useEffect(() => {
    if (rdxFilter.type.length !== 0) {
      setFilteredProperties(
        properties.filter((property) => rdxFilter.type.includes(property.type))
      );
    }
    if (rdxFilter.bedrooms.length !== 0) {
      setFilteredProperties(
        properties.filter((property) => rdxFilter.bedrooms.includes(property.features.bedrooms))
      );
    }
    if (rdxFilter.city.length !== 0) {
      setFilteredProperties(
        properties.filter((property) => rdxFilter.city.includes(property.city.toLowerCase()))
      );
    }
    if (rdxFilter.isAvailable.length !== 0) {
      setFilteredProperties(
        properties.filter((property) => rdxFilter.isAvailable.includes(property.isAvailable))
      );
    }

    if (
      rdxFilter.type.length === 0 &&
      rdxFilter.bedrooms.length === 0 &&
      rdxFilter.city.length === 0 &&
      rdxFilter.isAvailable.length === 0
    )
      setFilteredProperties(properties);
  }, [properties, rdxFilter.bedrooms, rdxFilter.city, rdxFilter.isAvailable, rdxFilter.type]);

  return (
    <>
      <Stack spacing={4} sx={{ mb: 6 }}>
        {filteredProperties.length === 0 &&
          [...Array(10)].map((_, index) => <PropertyCardSkeleton key={index} />)}
        {filteredProperties.length !== 0 &&
          filteredProperties.map((property) => <PropertyCard key={property.id} space={property} />)}
      </Stack>

      {/* <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      /> */}
    </>
  );
}

