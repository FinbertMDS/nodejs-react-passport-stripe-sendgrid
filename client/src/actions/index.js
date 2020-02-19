import axios from 'axios';
import { FETCH_USER, FETCH_CHARGE, FETCH_CUSTOMER, CREATE_SURVEY } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({type: FETCH_USER, payload: res.data});
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchCharge = () => async dispatch => {
  const res = await axios.get('/api/charges');

  dispatch({type: FETCH_CHARGE, payload: res.data.data});
};

export const fetchCustomer = () => async dispatch => {
  const res = await axios.get('/api/customers');

  dispatch({type: FETCH_CUSTOMER, payload: res.data.data});
};

export const createSurvey = ({title, body, subject, recipients}) => async dispatch => {
  const res = await axios.post('/api/surveys', {title, body, subject, recipients});

  dispatch({type: CREATE_SURVEY, payload: res.data});
};


