var token = "";

function login() {

    var queryURL = "https://localhost:44368/api/Authentication/requestToken";
    var item = {
        "username": document.getElementById("floatingInput").value,
        "password": document.getElementById("floatingPassword").value
    };
    fetch(queryURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then((response) => response.json()).then((data) => {
            console.log("Respuesta Login");
            console.log(data);
            console.log(data.token);
            if (data.token != null) {
                location.href = 'https://localhost:44326/dashboard/Index';
            } else {
                location.href = 'https://localhost:44326/home/login';
            }
            if (data) {
                token = data.token;
                remoteResponse.innerText = data.mensaje;


            }
            else {
                remoteResponse.innerText = data.mensaje;

            }

        })
        .catch((error) => remoteResponse.innerText = 'An error occurred, might be CORS!!');
}




