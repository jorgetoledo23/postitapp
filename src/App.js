import './App.css';
import React, { Fragment } from 'react'
import { PostList } from './components/PostList'

function App() {
  return (
    <Fragment>
      <div className="container">
        <h1 className='card-header mt-5'>Post It App</h1>
        
        <PostList />
      </div>

    
      
    </Fragment>

  );
}

export default App;
