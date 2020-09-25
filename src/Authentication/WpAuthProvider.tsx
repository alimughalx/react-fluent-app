// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';
import { WpLogin } from '../Modals/WpLogin';
import { getUserDetails } from '../Services/WPService';
export interface AuthComponentProps {
  error: any;
  isAuthenticated: boolean;
  user: any;
  login: Function;
  logout: Function;
  getAccessToken: Function;
  setError: Function;
  id: number;
}

interface AuthProviderState {
  error: any;
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  token: string | null;
}

export default function withAuthProvider<T extends React.Component<AuthComponentProps>>
  (WrappedComponent: new (props: AuthComponentProps, context?: any) => T): React.ComponentClass {
  return class extends React.Component<any, AuthProviderState> {
    private publicClientApplication: PublicClientApplication;
    public siteUrl: String = process.env.REACT_APP_API_URL || "";
    constructor(props: any) {
      super(props);
      this.state = {
        error: null,
        isAuthenticated: false,
        user: {},
        loading: false,
        token: null
      };

      // Initialize the MSAL application object
      this.publicClientApplication = new PublicClientApplication({
        auth: {
          clientId: process.env.REACT_APP_API_KEY || "",
          redirectUri: process.env.REACT_APP_REDIRECT_URI
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: true
        }
      });
    }

    componentDidMount() {
      // If MSAL already has an account, the user
      // is already logged in
      // const accounts = this.publicClientApplication.getAllAccounts();

      // if (accounts && accounts.length > 0) {
      //   // Enhance user object with data from Graph
      //   this.getUserProfile();
      // }
      this.getUserProfile();
    }

    render() {
      let id = this.props.match ? this.props.match.params.id : 0;
      return <WrappedComponent
        error={this.state.error}
        isAuthenticated={this.state.isAuthenticated}
        user={this.state.user}
        id={id}
        login={() => this.login()}
        logout={() => this.logout()}
        getAccessToken={(loginData: WpLogin) => this.getAccessToken(loginData)}
        setError={(message: string, debug: string) => this.setErrorMessage(message, debug)}
        {...this.props} />;
    }

    async login() {
      try {
        // Login via login info saved 
        // After login, get the user's profile
        let loginInfo: WpLogin = new WpLogin();
        loginInfo.username = process.env.REACT_APP_WP_USERNAME || "";
        loginInfo.password = process.env.REACT_APP_WP_PASSWORD || "";
        await this.getAccessToken(loginInfo).then(res => {
          getUserDetails(res.toString());
          this.setState({
            isAuthenticated: true
          })
        });
      }
      catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err)
        });
      }
    }

    logout() {
      this.publicClientApplication.logout();
    }

    async getAccessToken(loginData: WpLogin): Promise<string> {
      try {
        var res = await axios.post(`${this.siteUrl}/jwt-auth/v1/token`, loginData)
        if (undefined === res.data.token) {
          this.setState({ error: res.data.message, loading: false });
          return "";
        }
        const { token, user_nicename, user_email } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', user_nicename);

        this.setState({
          loading: false,
          token: token,
          user: {
            displayName: user_nicename,
            email: user_email
          },
          isAuthenticated: true
        })
        return token;

      } catch (err) {
        // If a silent request fails, it may be because the user needs
        // to login or grant consent to one or more of the requested scopes
        throw err;
      }
    }

    // <getUserProfileSnippet>
    async getUserProfile() {
      try {
        const wpUser = new WpLogin();
        wpUser.username = process.env.REACT_APP_WP_USERNAME ||"";
        wpUser.password = process.env.REACT_APP_WP_PASSWORD || "";
        var token = await this.getAccessToken(wpUser);
        await getUserDetails(token).then(userRes => {
          console.log(userRes);
        });
      }
      catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err)
        });
      }
    }
    // </getUserProfileSnippet>

    setErrorMessage(message: string, debug: string) {
      this.setState({
        error: { message: message, debug: debug }
      });
    }

    normalizeError(error: string | Error): any {
      var normalizedError = {};
      if (typeof (error) === 'string') {
        var errParts = error.split('|');
        normalizedError = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: error };
      } else {
        normalizedError = {
          message: error.message,
          debug: JSON.stringify(error)
        };
      }
      return normalizedError;
    }

    isInteractionRequired(error: Error): boolean {
      if (!error.message || error.message.length <= 0) {
        return false;
      }

      return (
        error.message.indexOf('consent_required') > -1 ||
        error.message.indexOf('interaction_required') > -1 ||
        error.message.indexOf('login_required') > -1 ||
        error.message.indexOf('no_account_in_silent_request') > -1
      );
    }
  }
}
