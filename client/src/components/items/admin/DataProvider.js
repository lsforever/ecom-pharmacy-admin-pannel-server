import { fetchUtils } from 'react-admin'
import { stringify } from 'query-string'

//const apiUrl = 'http://localhost:3000/api'
const apiUrl = 'https://niramoy-admin.herokuapp.com/api'



const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('x-auth-token', localStorage.getItem('auth'));
    return fetchUtils.fetchJson(url, options);
}

export default {
    //done
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        let { field, order } = params.sort;
        let filter = params.filter;

        //order = order.toLowerCase()
        // if (filter.id) {
        //     filter._id = filter.id
        //     delete filter.id
        // }

        if (field === 'id') {
            field = '_id'
        }


        if (filter.id) {
            filter._id = filter.id
            delete filter.id
        }
        // else {
            
        // }



        const query = {
            sort: JSON.stringify({ [field]: order.toLowerCase() }),
            range: JSON.stringify([(page - 1) * perPage, perPage]),
            filter: JSON.stringify(filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        // return httpClient(url).then(({ headers, json }) => ({

        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));



        return fetchJson(url)
            .then(({ headers, json }) => {
                
            
                const obj = {

                    data: json.map(resource => ({ ...resource, id: resource._id })),
                    total: parseInt(headers.get('content-range').split('/').pop(), 10),
                }
                

                return obj
            });
    },

    //done
    getOne: (resource, params) =>
        fetchJson(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
            const obj = {
                data: json
            }

            obj.data.id = obj.data._id
            delete obj.data._id
            return obj

        }),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return fetchJson(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return fetchJson(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    // done
    update: (resource, params) =>
        fetchJson(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...json, id: json._id },
         })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return fetchJson(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    //done
    create: (resource, params) =>
        fetchJson(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json._id },
        })),

    //done
    delete: (resource, params) =>
        fetchJson(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    //done
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ _id: params.ids }),
        };
        return fetchJson(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json._ids }));
    },
};