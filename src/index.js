import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import data from "./data/staticData";
import thunkMiddleware from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    newOrEditNoteForm: { visible: false, whichForm: "new", note: {} },
    newOrEditJournalForm: { visible: false, whichForm: "new", journal: {} },
    notes: {
      isLoading: false,
      notes: {},
      error: null,
    },
    journals: {
      isLoading: false,
      journals: {},
      error: null,
    },
    selectedJournal: null,
    googleSignInToken: {},
    currentUser: {},
    authenticationStatusChangeIsComplete: true,
  },
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
store.subscribe(() => {
  //   console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App data={data} />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
