import { createStore,combineReducers } from 'redux' 
// applyMiddleware
// combineReducers函数接收一个对象，这个对象就是子reducer以及它的key，将所有子reducer传入后，再将整个reducer导出即可
import routes from './reducers/routes';


const rootReducer = combineReducers({
    // user,
    // menu,
    // permission,
    // metadata,
    // list,
    routes
  })
  
  export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  