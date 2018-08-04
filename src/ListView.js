import React from 'react';

const ListView = props => {
  return (
    <div className="tombs-list">
      <ul>
        {props.tombs.map(tomb => (
          <li key={tomb.tid}>
            <button onClick={event => props.handleClick(event.target)}>
              {tomb.title}
            </button>
            <p className="info-text hidden">{tomb.extract}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListView;
