const ApiService = (url) => {
    return fetch(url)
    .then(data => {
        if(data.ok){
            return data.json();
        }else{
            return {
                code: '404',
                content: "통신 문제",
                detail: "네트워크 문제"
            };
        }
    })
    .then(response => {
        return {
            data: response
        };
    })
       
};

export default ApiService;