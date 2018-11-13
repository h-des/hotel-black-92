import axios from 'axios';
import fakeJSON from '../utils/fake_json';

export const fetchRooms = () => dispatch => {
  dispatch({ type: 'FETCH_ROOMS_REQUEST' });

  return axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(
      json => dispatch({ type: 'FETCH_ROOMS_SUCCESS', payload: json.data }),
      err => {
        console.log(err);
        return dispatch({ type: 'FETCH_ROOMS_FAILURE' });
      }
    );
};

export const fetchMoreRooms = () => dispatch => {
  dispatch({ type: 'FETCH_MORE_ROOMS_REQUEST' });

  return axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(
      json =>
        dispatch({ type: 'FETCH_MORE_ROOMS_SUCCESS', payload: json.data }),
      err => {
        console.log(err);
        return dispatch({ type: 'FETCH_MORE_ROOMS_FAILURE' });
      }
    );
};

// export const fetchRoomInfo = id => dispatch => {
//   dispatch({ type: 'FETCH_ROOM_INFO_REQUEST' });

//   return axios
//     .get(`https://jsonplaceholder.typicode.com/photos/${id}/comments?_limit=10`)
//     .then(
//       json =>
//         dispatch({
//           type: 'FETCH_ROOM_INFO_SUCCESS',
//           payload: { ...fakeJSON, comments: json.data, id }
//         }),
//       err => {
//         console.log(err);
//         return dispatch({ type: 'FETCH_ROOM_INFO_FAILURE' });
//       }
//     );
// };

export const fetchFullRoomInfo = id => dispatch => {
  dispatch({ type: 'FETCH_ROOM_INFO_REQUEST' });

  axios
    .get(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(json => {
      dispatch({
        type: 'FETCH_ROOM_INFO_HALF',
        payload: json.data
      });
      return axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}/comments?_limit=10`
      ); // using response.data
    })
    .then(json => {
      dispatch({
        type: 'FETCH_ROOM_INFO_SUCCESS',
        payload: { ...fakeJSON, comments: json.data, id }
      });
    });
};
