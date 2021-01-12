import React from 'react'

// //REDUX
// import { useSelector, useDispatch } from 'react-redux';

// //graphQL hooks
// import {useQuery} from '@apollo/react-hooks';

const CityInfo = (props) => {
  const {
    cityInfo,
    formattedDate
  } = props;
  console.log(cityInfo);
  console.log(formattedDate);
  return (
    <>
      <div>
        CityInfo
      </div>
    </>
  );
};

export default CityInfo;