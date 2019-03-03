import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import MainRouter from './Router/MainRouter';
import FreightNoteCreator from './Freights/Container/FreightNoteCreator';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter>
          <FreightNoteCreator />
        </MainRouter>
      </Provider>
    );
  }
}

export default App;
