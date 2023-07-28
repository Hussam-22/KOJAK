import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useAuthContext } from 'src/auth/hooks';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';

import ElearningCourseItem from './property-item';
import ElearningCourseItemSkeleton from './property-item-skeleton';

// ----------------------------------------------------------------------

export default function PropertiesList({ courses, loading }) {
  const [properties, setProperties] = useState([]);
  const { getAllSpacesInfo, addNewSpace } = useAuthContext();

  // const addListing = async () => {
  //   const data = await addNewSpace();
  //   console.log(data);
  // };

  useEffect(() => {
    (async () => {
      setProperties(await getAllSpacesInfo());
    })();
  }, [getAllSpacesInfo]);

  return (
    <>
      {/* <Stack spacing={4}>
        {(loading ? [...Array(9)] : courses).map((course, index) =>
          course ? (
            <ElearningCourseItem key={course.id} course={course} />
          ) : (
            <ElearningCourseItemSkeleton key={index} />
          )
        )}
      </Stack> */}

      <Stack spacing={4}>
        {properties.length !== 0 &&
          properties.map((property) => <PropertyCard key={property.id} space={property} />)}
      </Stack>

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

PropertiesList.propTypes = {
  courses: PropTypes.array,
  loading: PropTypes.bool,
};
