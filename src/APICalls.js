export const getListOfTombs = () =>
  fetch(
    'https://de.wikipedia.org/w/api.php?action=query&cmlimit=100&list=categorymembers&cmpageid=9640102&origin=*&format=json'
  )
    .then(res => res.json())
    .then(data => data.query.categorymembers);
