import React from 'react';

const ListView = props => {
  return (
    <div className="tombs-list" lang="de">
      <ul>
        {props.tombs.map(tomb => (
          <li key={tomb.tid}>
            <button
              className="list-button"
              onClick={event => props.handleClick(event.target, tomb.tid)}>
              {tomb.title}
            </button>
            {props.activeTomb.tid === tomb.tid && (
              <p className="info-text">{tomb.extract}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListView;
