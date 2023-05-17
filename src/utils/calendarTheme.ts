const calendarTheme = function (i: number, team: string) {
  const colorList = ['#AC8E7C', '#a8ac7c', '#87ac7c', '#7cac98', '#7cacac', '#877cac', '#ab7cac', '#ac7c84']

  return {
    id: i.toString(),
    name: team === 'common' ? '무소속' : team,
    backgroundColor: i % 2 === 0 ? colorList[i] : '#fff',
    borderColor: i % 2 === 0 ? colorList[i] : '#fff',
    dragBackgroundColor: colorList[i],
  }
}

export default calendarTheme
