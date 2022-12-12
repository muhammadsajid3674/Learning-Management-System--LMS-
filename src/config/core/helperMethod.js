function SetDate(dt) {
  return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`
}

export { SetDate }