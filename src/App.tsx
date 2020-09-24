// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { Component } from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'reactstrap';
import withAuthProvider, { AuthComponentProps } from './Authentication/WpAuthProvider';
import NavBar from './Components/Navigation/NavBar';
import ErrorMessage from './Helpers/ErrorMessage';
import Welcome from './Components/Home/Welcome';
import Calendar from './Components/Calander/Calendar';
import CreatePost from './Components/WPPost/Create';
import NewEvent from './Components/Calander/NewEvent';
import 'bootstrap/dist/css/bootstrap.css';
import { createTheme, ICustomizations, Customizer, Toggle } from "@fluentui/react";
import { config } from './Helpers/Config';
import PostDetails from './Components/WPPost/PostDetails';
import { RoutesConfig } from './Helpers/routes.config';
import { RSS } from './Components/RSS/RSS';

const dark: ICustomizations = {
  settings: {
    theme: createTheme({
      palette: config.darkThemePalette
    })
  },
  scopedSettings: {
  }
}

const light: ICustomizations = {
  settings: {
    theme: createTheme({
      palette: config.lightThemePalette
    })
  },
  scopedSettings: {
  }
}

interface AppState {
  currentTheme: ICustomizations
  currentThemeName: string
  currentThemeBackground: string
}

class App extends Component<AuthComponentProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTheme: light,
      currentThemeName: config.themes.light,
      currentThemeBackground: config.lightThemePalette.white
    };
    document.body.style.backgroundColor = config.lightThemePalette.white
  }

  _themeChange = (ev: any) => {
    if (this.state.currentThemeName === config.themes.light) {
      this.setState({
        currentTheme: dark,
        currentThemeName: config.themes.dark,
        currentThemeBackground: config.darkThemePalette.white
      })
      document.body.style.backgroundColor = config.darkThemePalette.white
    } else {
      this.setState({
        currentTheme: light,
        currentThemeName: config.themes.light,
        currentThemeBackground: config.lightThemePalette.white
      })
      document.body.style.backgroundColor = config.lightThemePalette.white
    }
  }
  render() {
    let error = null;
    if (this.props.error) {
      error = <ErrorMessage
        message={this.props.error.message}
        debug={this.props.error.debug} />;
    }

    // <renderSnippet>
    return (
      <Router>
        <Switch>
          <Customizer {...this.state.currentTheme} >
            <div style={{ backgroundColor: this.state.currentThemeBackground }}>
              <NavBar
                isAuthenticated={this.props.isAuthenticated}
                authButtonMethod={this.props.isAuthenticated ? this.props.logout : this.props.login}
                user={this.props.user} />
              <Container>
                <Toggle label="Dark Mode" title="Switch Theme" onChange={this._themeChange} />
                {error}
                <Route exact={RoutesConfig.Home.exact} path={RoutesConfig.Home.path}
                  render={(props) =>
                    <Welcome {...props}
                      isAuthenticated={this.props.isAuthenticated}
                      user={this.props.user}
                      authButtonMethod={this.props.login} />
                  } />
                <Route exact={RoutesConfig.Calendar.exact} path={RoutesConfig.Calendar.path}
                  render={(props) =>
                    this.props.isAuthenticated ?
                      <Calendar {...props} /> :
                      <Redirect to="/" />
                  } />
                <Route exact={RoutesConfig.CreatePost.exact} path={RoutesConfig.CreatePost.path}
                  render={(props) =>
                    this.props.isAuthenticated ?
                      <CreatePost {...props} /> :
                      <Redirect to="/" />
                  } />
                <Route exact={RoutesConfig.PostDetails.exact} path={RoutesConfig.PostDetails.path} render={
                  (props) => this.props.isAuthenticated ? <PostDetails {...props} /> : <Redirect to="/" />
                } />
                <Route exact={RoutesConfig.RSS.exact} path={RoutesConfig.RSS.path} render={
                  (props) => this.props.isAuthenticated ? <RSS {...props} /> : <Redirect to="/" />
                }/>
                <Route exact={RoutesConfig.NewEvent.exact} path={RoutesConfig.NewEvent.path}
                  render={(props) =>
                    this.props.isAuthenticated ?
                      <NewEvent {...props} /> :
                      <Redirect to="/" />
                  } />
              </Container>
            </div>
          </Customizer>
        </Switch>
      </Router>
    );
    // </renderSnippet>
  }
}

export default withAuthProvider(App);
