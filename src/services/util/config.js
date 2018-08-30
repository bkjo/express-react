const Config = () => {
    return fetch('/config/config.json')
            .then(response => response.json())
            .catch(err => 'Cannot load config.json');
}

export default Config;
