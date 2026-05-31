document.addEventListener("DOMContentLoaded", () => {

    const paginasProtegidas = [

        "agendar.html",
        "horarios.html",
        "citas.html",
        "perfil.html",
        "confirmacion.html"

    ];

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop();

    const logueado =
        localStorage.getItem(
            "usuarioLogueado"
        );

    if (

        paginasProtegidas.includes(
            paginaActual
        )

        &&

        !logueado

    ) {

        window.location.href =
            "login.html";

    }



    const loginForm =
        document.querySelector(
            ".login-form"
        );

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                const correo =
                    loginForm.querySelector(
                        'input[type="email"]'
                    ).value;

                const password =
                    loginForm.querySelector(
                        'input[type="password"]'
                    ).value;

                if (
                    correo === ""
                    ||
                    password === ""

                ) {

                    alert(
                        "Completa todos los campos"
                    );

                    return;

                }

                localStorage.setItem(
                    "usuarioLogueado",
                    "true"
                );

                const nombre =
                    localStorage.getItem(
                        "nombreUsuario"
                    );

                localStorage.setItem(
                    "usuarioActivo",
                    nombre
                );

                window.location.href =
                    "index.html";

            });

    }



    const registroForm =
        document.querySelector(
            ".register-form"
        );

    if (registroForm) {

        registroForm.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                const inputs =
                    registroForm.querySelectorAll(
                        "input"
                    );

                for (let campo of inputs) {

                    if (campo.value === "") {

                        alert(
                            "Completa todos los campos"
                        );

                        return;

                    }

                }

                const password =
                    inputs[3].value;

                const confirmar =
                    inputs[4].value;

                if (password !== confirmar) {

                    alert(
                        "Las contraseñas no coinciden"
                    );

                    return;

                }

                const nombre =
                    inputs[0].value;

                localStorage.setItem(
                    "nombreUsuario",
                    nombre
                );

                alert(
                    "Registro exitoso"
                );

                window.location.href =
                    "login.html";

            });

    }



    const nombreNav =
        document.querySelector(
            ".nav-username"
        );

    const botonSalir =
        document.querySelector(
            ".logout-btn"
        );

    const botonIngresar =
        document.querySelector(
            ".login-btn"
        );

    const nombre =
        localStorage.getItem(
            "usuarioActivo"
        );

    if (nombre) {

        if (nombreNav) {

            nombreNav.textContent =
                nombre;

        }

        if (botonSalir) {

            botonSalir.style.display =
                "block";

        }

        if (botonIngresar) {

            botonIngresar.style.display =
                "none";

        }

    } else {

        if (nombreNav) {

            nombreNav.textContent =
                "";

        }

        if (botonSalir) {

            botonSalir.style.display =
                "none";

        }

        if (botonIngresar) {

            botonIngresar.style.display =
                "block";

        }

    }



    const logoutBtns =
        document.querySelectorAll(
            ".logout-btn"
        );

    logoutBtns.forEach(
        btn => {

            btn.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "usuarioLogueado"
                    );

                    localStorage.removeItem(
                        "usuarioActivo"
                    );

                    window.location.href =
                        "login.html";

                });

        });



    const horas =
        document.querySelectorAll(
            ".hour-btn"
        );

    horas.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                horas.forEach(
                    h => h.classList.remove(
                        "selected"
                    )
                );

                btn.classList.add(
                    "selected"
                );

            });

    });



    const agendarForm =
        document.querySelector(
            ".appointment-form"
        );

    if (agendarForm) {

        agendarForm.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                const servicio =
                    agendarForm.querySelector(
                        "select"
                    ).value;

                const fecha =
                    agendarForm.querySelector(
                        'input[type="date"]'
                    ).value;

                const hoy =
                    new Date()
                        .toISOString()
                        .split("T")[0];

                if (fecha < hoy) {

                    alert(
                        "No puedes seleccionar fechas pasadas"
                    );

                    return;

                }

                const hora =
                    document.querySelector(
                        ".hour-btn.selected"
                    );

                if (!fecha) {

                    alert(
                        "Selecciona fecha"
                    );

                    return;

                }

                if (!hora) {

                    alert(
                        "Selecciona hora"
                    );

                    return;

                }

                const cita = {

                    servicio,

                    fecha,

                    hora:
                        hora.textContent

                };

                localStorage.setItem(

                    "citaActual",

                    JSON.stringify(
                        cita
                    )

                );

                window.location.href =
                    "confirmacion.html";

            });

    }



    const cita =
        localStorage.getItem(
            "citaActual"
        );

    if (cita) {

        const datos =
            JSON.parse(
                cita
            );

        const servicio =
            document.getElementById(
                "confirm-servicio"
            );

        const fecha =
            document.getElementById(
                "confirm-fecha"
            );

        const hora =
            document.getElementById(
                "confirm-hora"
            );

        if (servicio) {

            servicio.textContent =
                datos.servicio;

            fecha.textContent =
                datos.fecha;

            hora.textContent =
                datos.hora;

        }

    }



    const contenedor =
        document.getElementById(
            "appointments-container"
        );

    if (

        contenedor

        &&

        localStorage.getItem(
            "citaActual"
        )

    ) {

        const cita =
            JSON.parse(

                localStorage.getItem(
                    "citaActual"
                )

            );

        contenedor.innerHTML = `

<div class="appointment-item">

<div class="appointment-top">

<h3>

${cita.servicio}

</h3>

<span class="status-ok">

Confirmada

</span>

</div>

<p>

${cita.fecha}

</p>

<p>

${cita.hora}

</p>

<hr>

<button class="cancel-btn">

Cancelar cita

</button>

</div>

`;

    }



    document.addEventListener(
        "click",
        (e) => {

            if (

                e.target.classList.contains(
                    "cancel-btn"
                )

            ) {

                const confirmar =
                    confirm(
                        "¿Seguro que deseas cancelar esta cita?"
                    );

                if (!confirmar) {

                    return;

                }

                localStorage.removeItem(
                    "citaActual"
                );

                e.target.closest(
                    ".appointment-item"
                ).remove();

                alert(
                    "Cita cancelada"
                );

            }

        });

});