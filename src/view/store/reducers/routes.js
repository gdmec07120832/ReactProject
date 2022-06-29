import cloneDeep from 'lodash/cloneDeep'

const InitState = {
//   routes: [],
//   routesNameMapV2: {},
  routes: 'routes_AA',
  routesNameMapV2: 'routesNameMapV2_BB',
}

const routes = (state = InitState, action) => {
  switch (action.type) {
    case 'update_routes':
      return {
        ...cloneDeep(state),
        routes: action.routes,
        routesNameMapV2: action.routesNameMapV2,
      }
    default:
      return state
  }
}

export default routes
