export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const qtd = state.length
      if (qtd) {
        for (var i = 0; i < qtd; i++) {
          if ( state[i].hasOwnProperty(action.name) ) {
            let update = { [action.name]: action.value }
            state[i] = update
            return state
          }
        }
      }

      let newField = { [action.name]: action.value }
      state.push(newField)
      return state
    }

    default:
      return state
  }
}
