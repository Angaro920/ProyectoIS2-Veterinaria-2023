
const input = document.querySelector("#floatingInput");
const button = document.querySelector("#burt");
var usuario = "";
var roles = "";


function GenerarRol() {
    const sesion = document.getElementById('floatingInput').value;
    fetch(`https://localhost:44368/api/Empleado/${sesion}`)
        .then((res) => res.json()).then(data => {
            usuario = data.usuario;
            roles = data.rol;
            sessionStorage.setItem("username", usuario);
            sessionStorage.setItem("roles", roles);
        });
    return usuario;
}
function autorizacion() {
    var URLactual = window.location.href;
    var usuario = console.log(sessionStorage.getItem("usuario"));
    var Role = sessionStorage.getItem("roles");
    if (Role == null) {
        if (URLactual == "https://localhost:44326/dashboard/Index") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Pets") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Clients") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/ClinicHistory") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Products") {
            location.href = 'https://localhost:44326/home/login';
        } 
        if (URLactual == "https://localhost:44326/Dashboard/EnvioCorreos") {
            location.href = 'https://localhost:44326/home/login';
        }
    }
    if (Role != "Asistente" && Role != "Veterinario") {
        if (URLactual == "https://localhost:44326/dashboard/Index") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Pets") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Clients") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/ClinicHistory") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/Products") {
            location.href = 'https://localhost:44326/home/login';
        }
        if (URLactual == "https://localhost:44326/Dashboard/EnvioCorreos") {
            location.href = 'https://localhost:44326/home/login';
        }
    }
    if (Role == "Asistente") {
        if (URLactual == "https://localhost:44326/Dashboard/ClinicHistory") {
            location.href = 'https://localhost:44326/dashboard/Index';
        }
    } else if (Role=="Veterinario") {
        if (URLactual == "https://localhost:44326/Dashboard/Products") {
            location.href = 'https://localhost:44326/dashboard/Index';
        }
    }
}
autorizacion();