import 'babel-core/polyfill';
import { Router, Route, Link } from 'react-router';
import DiagnosePage from './components/DiagnosePage.jsx';
import Top from './components/Top.jsx';
import React from 'react';


(function () {
  let React = require('react');
  let ReactDOM = require('react-dom');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Main = require('./components/main.jsx'); // Our custom react component
  let PatientTable = require('./components/PatientTable.jsx');

  //Needed for React Developer Tools
  window.React = React;

  //window.Symbol.iterator = require('core-js/fn/symbol/iterator');

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();


  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  //ReactDOM.render(<Main />, document.getElementById('app'));

const App = React.createClass({
  render() {
    return (
      <div>
      <Top></Top>
      {this.props.children}
      </div>
    );
  },
});

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="patients" component={PatientTable} />
      <Route path="diagnose" component={DiagnosePage} />
    </Route>
  </Router>,
  document.getElementById('app')
);

})();
