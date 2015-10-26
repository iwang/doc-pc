 import 'babel-core/polyfill';
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

let PATIENTS = [
  {id:1, name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:2,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:3,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:4,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
];

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  //ReactDOM.render(<Main />, document.getElementById('app'));

ReactDOM.render(
  <PatientTable patients={PATIENTS} />,
  document.getElementById('app')
);

})();
