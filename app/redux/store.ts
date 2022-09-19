import { configureStore } from '@reduxjs/toolkit';
import stateReduces from './stateReduces';
const store = configureStore ({ reducer: stateReduces });

export default store;