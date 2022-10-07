import React from 'react';
import classNames from 'classnames';
import Cards from '../../components/Cards';
import './styles.css';

function App() {
  return (
    <div className={classNames('wrapper')}>
      <h1 className={classNames('title')}>Mahjong</h1>
      <Cards />
    </div>
  );
}

export default App;
