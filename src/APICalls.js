export const getListOfTombs = () =>
  fetch(
    'https://de.wikipedia.org/w/api.php?action=query&cmlimit=100&list=categorymembers&cmpageid=9640102&origin=*&format=json'
  )
    .then(res => res.json())
    .then(data =>
      data.query.categorymembers.map(entry => entry.title.split(' ').join('_'))
    );

export const getDetailsOfTombs = async array => {
  let listOfTombObjects = [];
  await Promise.all(
    array.map(title =>
      fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${title}`).then(
        results => results.json().then(data => listOfTombObjects.push(data))
      )
    )
  );
  return listOfTombObjects;
};
