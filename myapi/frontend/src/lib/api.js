const fastapi = async (
    operation,
    url,
    params,
    success_callback,
    failure_callback
) => {
    let method = operation;
    let content_type = 'application/json';
    let body = JSON.stringify(params);

    let _url = import.meta.env.VITE_SERVER_URL + url;
    if (method === 'get') {
        _url += '?' + new URLSearchParams(params);
    }

    let options = {
        method: method,
        headers: {
            'Content-Type': content_type
        }
    };

    if (method !== 'get') {
        options['body'] = body;
    }

    const response = await fetch(_url, options);
    try {
        if (response.status === 204) {
            // No content
            if (success_callback) {
                success_callback();
            }
            return;
        }

        const json = await response.json();
        if (response.status >= 200 && response.status < 300) {
            // 200 ~ 299
            if (success_callback) {
                success_callback(json);
            }
            return;
        }

        if (failure_callback) {
            failure_callback(json);
        } else {
            alert(JSON.stringify(json));
        }
    } catch (error) {
        alert(JSON.stringify(error));
    }
};

export default fastapi;
