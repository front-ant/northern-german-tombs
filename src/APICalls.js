export const getListOfTombs = () =>
  // Fetch all entries from the category "Megalithic Tombs in Lüneburg County" from Wikipedia
  fetch(
    'https://de.wikipedia.org/w/api.php?action=query&cmlimit=100&list=categorymembers&cmpageid=9640102&origin=*&format=json'
  )
    .then(res => res.json())
    // Format the entry titles so they can be used for the next API call
    // (replace spaces with underscores)
    .then(data =>
      data.query.categorymembers.map(entry => entry.title.split(' ').join('_'))
    );

export const getDetailsOfTombs = async array => {
  let listOfTombObjects = [];
  // wait until all API requests have gone through, only then return the array
  await Promise.all(
    array.map(title =>
      fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${title}`).then(
        results => results.json().then(data => listOfTombObjects.push(data))
      )
    )
  );
  // Return only tomb object that have a coordinates property
  // and convert into Google-readable latlng literals
  return listOfTombObjects.filter(tomb => tomb.coordinates).map(t => {
    t.coordinates.lng = t.coordinates.lon;
    delete t.coordinates.lon;
    return t;
  });
};
