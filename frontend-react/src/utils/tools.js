module.exports = {
  // Implement possiblity to add different date formats
  timestampToDate: function(ts) {
    if (ts) {
      const date = new Date(ts * 1000)
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return
  }
}
