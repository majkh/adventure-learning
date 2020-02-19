import AuthenticationContext from 'adal-angular/lib/adal.js'

const config = {
    tenant: '8f47ad71-44ca-48bf-afe3-56b9360a4495',

    // Application ID
    clientId: "0e428537-28dd-4111-bd48-c463cf37e91f",

    // Host URI
    redirectUri: window.location.origin,

    cacheLocation: 'localStorage'
};

class Authentication {
    authenticationContext: any;
    initialize: any;
    acquireToken: any;
    acquireTokenRedirect: any;
    isAuthenticated: any;
    getUserProfile: any;
    signIn: any;
    signOut: any;
    constructor() {
        this.authenticationContext = null,
            /**
             * @return {Promise}
             */
            this.initialize = () => {
                this.authenticationContext = new AuthenticationContext(config);

                return new Promise((resolve, reject) => {
                    if (this.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
                        // redirect to the location specified in the url params.
                        this.authenticationContext.handleWindowCallback();
                    }
                    else {
                        // try pull the user out of local storage
                        let user = this.authenticationContext.getCachedUser();

                        if (user) {
                            resolve();
                        }
                        else {
                            // no user at all - go sign in.
                            this.signIn();
                        }
                    }
                });
            },
            /**
             * @return {Promise.<String>} A promise that resolves to an ADAL token for resource access
             */
            this.acquireToken = () => {
                return new Promise((resolve, reject) => {
                    this.authenticationContext.acquireToken('<azure active directory resource id>', (error: any, token: any) => {
                        if (error || !token) {
                            return reject(error);
                        } else {
                            return resolve(token);
                        }
                    });
                });
            },
            /**
             * Issue an interactive authentication request for the current user and the api resource.
             */
            this.acquireTokenRedirect = () => {
                this.authenticationContext.acquireTokenRedirect('<azure active directory resource id>');
            },
            /**
             * @return {Boolean} Indicates if there is a valid, non-expired access token present in localStorage.
             */
            this.isAuthenticated = () => {
                // getCachedToken will only return a valid, non-expired token.
                if (this.authenticationContext.getCachedToken(config.clientId)) { return true; }
                return false;
            },
            /**
             * @return An ADAL user profile object.
             */
            this.getUserProfile = () => {
                return this.authenticationContext.getCachedUser().profile;
            },
            this.signIn = () => {
                this.authenticationContext.login();
            },
            this.signOut = () => {
                this.authenticationContext.logOut();
            }
    }


}

export const authentication = new Authentication();