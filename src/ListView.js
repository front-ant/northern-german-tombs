import React from 'react';

const ListView = props => {
  return (
    <div className="tombs-list">
      <ul>{props.tombs.map(tomb => <li key={tomb.tid}>{tomb.title}</li>)}</ul>
    </div>
  );
};
export default ListView;
