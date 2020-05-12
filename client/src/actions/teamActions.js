import axios from 'axios';
import { GET_TEAMS, ADD_TEAM, DELETE_TEAM, TEAMS_LOADING } from './types';

export const getTeams = () => dispatch => {
  dispatch(setTeamsLoading());
  axios
    .get('/api/teams')
    .then(res => dispatch({
      type: GET_TEAMS,
      payload: res.data
    }))
};

export const addTeam = team => dispatch => {
  axios
    .post('/api/teams', team)
    .then(res =>
      dispatch({
        type: ADD_TEAM,
        payload: res.data
    })
  )
};

export const deleteTeam = id => dispatch => {
  axios.delete(`/api/teams/${id}`).then(res =>
    dispatch({
      type: DELETE_TEAM,
      payload: id
    })
  );
};



export const setTeamsLoading = () => {
  return {
    type: TEAMS_LOADING
  };
};
