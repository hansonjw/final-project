import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_PERSPECTIVE } from '../utils/mutations';
import { QUERY_GET_PERSPECTIVES, QUERY_ME } from '../utils/queries';

// import GetPerspectives from './GetPerspectives.js';

const AddPerspective = (tickerSymbol) => {

  // const { ticker } = useParams();

  // can't quite get this cache thing to work...
  // could do something using links instead of buttons...
  const [perspectiveText, setText] = useState('');
  const [addPerspective, { error }] = useMutation(ADD_PERSPECTIVE, {
    update(cache, { data: { addPerspective } }) {
      try {
        const { perspectives } = cache.readQuery({ query: QUERY_GET_PERSPECTIVES });
        cache.writeQuery({
          query: QUERY_GET_PERSPECTIVES,
          data: { perspectives: [addPerspective, ...perspectives] }
        });
      } catch (e) {
        console.error(e);
      }

      console.log(cache);

      const { perspectives } = cache.readQuery({ query: QUERY_GET_PERSPECTIVES });
      cache.writeQuery({
        query: QUERY_GET_PERSPECTIVES,
          data: { perspectives: [addPerspective, ...perspectives] }
      });
    }
  });


  const handleChange = event => {
    setText(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log('button was pushed');
    console.log(tickerSymbol.ticker);
    console.log(perspectiveText);
    try {
      await addPerspective({
        variables: { text: perspectiveText, security: tickerSymbol.ticker }
      });
    } catch(e) {
      console.error(e);
    }
    // clear form value
    setText('');
  }

  if (!tickerSymbol.ticker){
    return <h3>...</h3>
  }

  return (
    <div>
      <h1>Add Perspective Component</h1>
      <h2>{tickerSymbol.ticker}</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Add a new perspective..."
          value={perspectiveText}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Perspective</button>
      </form>
    </div>
  );
};

export default AddPerspective