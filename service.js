export function api(path, method = "GET", body = null, token) {
    const url = "http://localhost:5026/api/v1/Product"+path;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }

    if (token) {

        options.headers.Authorization = `Bearer ${token}`
    }
    if (body != null) {
        options.body = JSON.stringify(body);
    }
    return fetch(url, options)
}

export async function getProducts() {
    try {
        let data = await api('/all', "GET", null, null)

        if (data.status === 200) {
            let resp = await data.json();

            return resp;
        } else {
            let resp = await data.json();
            console.log(resp);
            return resp.error
        }

    } catch (error) {
        console.log(error);
    }
}

export async function createProduct(product) {
    try {
        let body = {
            price:product.price,
            name:product.name,
            category:product.category,
            dateOfFabrication:product.dateOfFabrication
        }
        let data = await api('/create', "POST", body, null)

        if (data.status !== 400 && data.status!== 200){
            return await data.text();
        }

    } catch (error) {
        return error;
    }
}

export async function updateProduct(product) {
    try {
        let body = {
            price:product.price,
            name:product.name,
            category:product.category,
            dateOfFabrication:product.dateOfFabrication
        }
        let data = await api(`/update?id=${product.id}`, "PUT", body, null)

        if (data.status !== 400 && data.status!== 200){
            return await data.text();
        }

    } catch (error) {
        return error;
    }
}

export async function deleteProduct(id){
    try {
        let body = {}
        let data = await api(`/delete/${id}`, "DELETE", null, null)

        if (data.status !== 400){
            return await data.text();
        }

    } catch (error) {
        return error;
    }
}