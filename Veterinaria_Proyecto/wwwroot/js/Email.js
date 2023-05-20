var token = "";

function Email() {

    var queryURL = "https://localhost:44368/api/Email/sendEmail";
    var item = {
        "destinatario": document.getElementById("Destinatario").value,
        "asunto": document.getElementById("Asunto").value,
        "usuario": document.getElementById("Usuario").value,
        "idHistoriaClinica": parseInt(document.getElementById("idHistoriaClinica").value),
        "idMascota": parseInt(document.getElementById("idMascota").value),
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
            console.log(data.mensaje);
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




