import {CREATE_ORDER} from '../constants/actionTypes';

export default (orders = [], action) => {
    
    switch (action.type) {
        case CREATE_ORDER:
            return [...orders, action.payload];
        default:
            return orders;
    }
}