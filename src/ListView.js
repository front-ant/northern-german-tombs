import React from 'react';

const ListView = props => {
  return (
    <section className="tombs-list" lang="de">
      <h1 id="page-heading" tabIndex="0">
        Map of Megalithic Tombs in Lüneburg County, Germany
      </h1>
      <a className="skip-link" href="#filter-bar">
        Skip to Filter
      </a>
      <ul>
        {props.tombs.map(tomb => (
          <li key={tomb.tid}>
            <button
              className="list-button"
              onClick={event => props.handleClick(event.target, tomb.tid)}>
              {tomb.title}
            </button>
            {
              // Only show info text for active tomb
            }
            {props.activeTomb.tid === tomb.tid && (
              <div className="expanded-info">
                <p className="info-text" tabIndex="0">
                  {tomb.extract}
                </p>
                <a
                  className="skip-link"
                  href={tomb.content_urls.desktop.page}
                  target="_blank">
                  Skip to Wikipedia Page
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ListView;
