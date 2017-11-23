export function updateField(name, value) {
  return {
    type: 'UPDATE_FIELD',
    name, value
  }
}
