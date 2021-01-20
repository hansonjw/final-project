import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_PERSPECTIVE } from '../utils/mutations';
import { useParams } from 'react-router-dom';

import GetPerspectives from '../components/GetPerspectives.js';

const AddPerspective = () => {

  const { ticker } = useParams();

  const [perspectiveText, setText] = useState('');
  const [addPerspective, { error }] = useMutation(ADD_PERSPECTIVE);

  const handleChange = event => {
    setText(event.target.value);
};

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log('button was pushed');
    console.log(ticker);
    console.log(perspectiveText);
    try {
      await addPerspective({
        variables: { text: perspectiveText, security: ticker }
      });
    } catch(e) {
      console.error(e);
    }
    // clear form value
    setText('');
  }

  return (
    <div>
      <h1>Add Perspective Component</h1>
      <h2>{ticker}</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Add a new perspective..."
          value={perspectiveText}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit Perspective</button>
      </form>
      <GetPerspectives ticker={ticker} />
    </div>
  );
};

export default AddPerspective