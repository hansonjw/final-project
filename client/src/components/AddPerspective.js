import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_PERSPECTIVE } from '../utils/mutations';
import { QUERY_GET_PERSPECTIVES, QUERY_ME } from '../utils/queries';
import { useParams } from 'react-router-dom';

// import GetPerspectives from './GetPerspectives.js';

const AddPerspective = (tickerSymbol) => {

  // const { ticker } = useParams();

  const [perspectiveText, setText] = useState('');
  const [addPerspective, { error }] = useMutation(ADD_PERSPECTIVE, {
    update(cache, { data: { addPerspective } }) {
      try {
        const { perspectives } = cache.readQuery({ query: QUERY_GET_PERSPECTIVES });
        cache.writeWuery({
          query: QUERY_GET_PERSPECTIVES,
          data: { perspectives: [addPerspective, ...perspectives] }
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, perspectives: [...me.perspectives, addPerspective] }}
      });
    }
  });



//   const [addThought, { error }] = useMutation(ADD_THOUGHT, {
//     update(cache, { data: { addThought } }) {
//       try {
//         // could potentially not exist yet, so wrap in a try...catch
//         const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
//         cache.writeQuery({
//           query: QUERY_THOUGHTS,
//           data: { thoughts: [addThought, ...thoughts] }
//         });
//       } catch (e) {
//         console.error(e);
//       }
  
//       // update me object's cache, appending new thought to the end of the array
//       const { me } = cache.readQuery({ query: QUERY_ME });
//       cache.writeQuery({
//         query: QUERY_ME,
//         data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
//       });
//     }
// });



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