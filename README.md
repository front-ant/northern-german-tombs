# Map of Megalithic Tombs in Lüneburg County, Germany

## Overview

This is my final project of Udacity's Front-End Web Developer Nanodegree. Since I will be moving to the countryside in a couple of weeks and also studied Archeology in college (no, not _just_ because of Indiana Jones!), I decided to create this map of ancient stone tombs that can be found on my new home turf.

I deployed the app to GitHub pages, check it out [here](https://front-ant.github.io/northern-german-tombs/).

## APIs

This project uses data from the Google Maps and the Wikipedia API. Although I do not expect this list of tombs to change anytime soon, I wanted to create it dynamically each time it loads so that a change to the Wikipedia category of [Megalithic Tombs in Lüneburg County](https://de.wikipedia.org/wiki/Kategorie:Gro%C3%9Fsteingrab_im_Landkreis_L%C3%BCneburg) will be reflected in the displayed sites.

A second API call then takes the Wikipedia entries from the first and fetches detailed information about each entry.

I hope that this way, the project can be adapted for other similar (and maybe more dynamic) contents with a single change of Wikipedia categories.

### Contents

The fetched contents may be filtred using a text input that will match the queries to the Wikipedia entry titles. Additionally, a checkbox will toggle the displaying of entries based on whether or not they feature a custom image.

Since this a rather niche topic, the Wikipedia entries I fetched are mostly in German. I apologize for any inconvenience this might cause.

## Installation

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It should be run in production mode:

- After cloning this repository, run `npm install` in the project folder.
- Create a production build like so: `npm run build`
- Run `install -g serve`
- Run `serve -s build` to have the app being served on `localhost:5000`

## Future Improvements

- Dig deeper into the `react-google-maps` package to add some features like fitting the map to new boundaries after a filter has been applied.
- Add a third filter to toggle entries that feature an English description and give the option to show the English Wikipedia entry.
- Transform into a more general app that will display all Wikipedia articles from a category on a map (if most of the articles lend themselves to it, meaning they must contain coordinates). 
