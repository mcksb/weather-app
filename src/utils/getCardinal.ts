export const getCardinal = (deg: number): string => {
  if (deg >= 348.75 || deg < 11.25) return 'N';
  if (deg < 33.75) return 'NNE';
  if (deg < 56.25) return 'NE';
  if (deg < 78.75) return 'ENE';
  if (deg < 101.25) return 'E';
  if (deg < 123.75) return 'ESE';
  if (deg < 146.25) return 'SE';
  if (deg < 168.75) return 'SSE';
  if (deg < 191.25) return 'S';
  if (deg < 213.75) return 'SSW';
  if (deg < 236.25) return 'SW';
  if (deg < 258.75) return 'WSW';
  if (deg < 281.25) return 'W';
  if (deg < 303.75) return 'WNW';
  if (deg < 326.25) return 'NW';
  return 'NNW';
};