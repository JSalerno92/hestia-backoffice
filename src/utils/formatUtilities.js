export function formatDateISOToDDMMYYYY(isoString) {

  if (!isoString) return '';

  const [year, month, day] = isoString.split('T')[0].split('-');

  return `${day}/${month}/${year}`;

}