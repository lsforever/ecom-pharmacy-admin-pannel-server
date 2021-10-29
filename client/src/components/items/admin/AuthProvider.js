import jwt_decode from 'jwt-decode'
import axios from 'axios'

const authProvider = {
    // authentication
    login: ({ email, password }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {
            email: email,
            password: password
        }

        return axios.post('/api/auth', body, config)
            .then(function (res) {
                // handle success
                if (res.status < 200 || res.status >= 300) {
                    throw new Error(res.statusText);
                }
         
                return res

            })
            .catch(function (error) {
                // handle error

                console.log(error);
            })
            .then(function (res) {
                // always executed
                localStorage.setItem('auth', res.data.token)
                //localStorage.setItem('auth', JSON.stringify(res.body.token))
                return res
            });


        //console.log('https://mydomain.com/authenticate')
        //console.log('process.env.apiUrl')
        // const request = new Request('/api/test', {
        //     method: 'POST',
        //     body: JSON.stringify({ email, password }),
        //     headers: new Headers({ 'Content-Type': 'application/json' }),
        // });
        // return fetch(request)
        //     .then(response => {
        //         if (response.status < 200 || response.status >= 300) {
        //             throw new Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        //     .then(auth => {
        //         localStorage.setItem('auth', JSON.stringify(auth));
        //     })
        //     .catch(() => {
        //         throw new Error('Network error')
        //     });
    },

    checkError: error => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },

    checkAuth: params => localStorage.getItem('auth')
        ? Promise.resolve()
        : Promise.reject(),

    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },


    getIdentity: () => {

        try {
            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
            return Promise.resolve({ id, fullName, avatar });
        } catch (error) {
            return Promise.reject(error);
        }

    },
    // authorization
    getPermissions: params => {
        const role = localStorage.getItem('permissions')
        return role ? Promise.resolve(role) : Promise.reject()
    },


};

export default authProvider;