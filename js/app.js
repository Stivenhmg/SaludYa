document.addEventListener("DOMContentLoaded", () => {

    // Protección

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

        logueado !== "true"

    ) {

        window.location.href =
            "login.html";

        return;

    }


    // Login

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
                    ).value.trim();

                const password =
                    loginForm.querySelector(
                        'input[type="password"]'
                    ).value.trim();

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

                const correoGuardado =
                    localStorage.getItem(
                        "correoRegistrado"
                    );

                const passwordGuardada =
                    localStorage.getItem(
                        "passwordRegistrada"
                    );

                if (

                    !correoGuardado

                    ||

                    !passwordGuardada

                ) {

                    alert(
                        "No hay usuarios registrados"
                    );

                    return;

                }

                if (

                    correo !== correoGuardado

                    ||

                    password !== passwordGuardada

                ) {

                    alert(
                        "Correo o contraseña incorrectos"
                    );

                    return;

                }

                localStorage.setItem(
                    "usuarioLogueado",
                    "true"
                );

                localStorage.setItem(

                    "usuarioActivo",

                    localStorage.getItem(
                        "nombreUsuario"
                    )

                );

                window.location.href =
                    "index.html";

            });

    }


    // Registro

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

                    if (

                        campo.value.trim()

                        === ""

                    ) {

                        alert(
                            "Completa todos los campos"
                        );

                        return;

                    }

                }

                const nombre =
                    inputs[0].value.trim();

                const correo =
                    inputs[2].value.trim();

                const password =
                    inputs[3].value;

                const confirmar =
                    inputs[4].value;

                if (

                    password !== confirmar

                ) {

                    alert(
                        "Las contraseñas no coinciden"
                    );

                    return;

                }

                localStorage.setItem(
                    "nombreUsuario",
                    nombre
                );

                localStorage.setItem(
                    "correoRegistrado",
                    correo
                );

                localStorage.setItem(
                    "passwordRegistrada",
                    password
                );

                alert(
                    "Registro exitoso"
                );

                window.location.href =
                    "login.html";

            });

    }


    // Navbar

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

    const usuarioActivo =
        localStorage.getItem(
            "usuarioActivo"
        );

    if (

        usuarioActivo

        &&

        localStorage.getItem(
            "usuarioLogueado"
        ) === "true"

    ) {

        if (nombreNav) {

            nombreNav.textContent =
                usuarioActivo;

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


    // Logout

    document
        .querySelectorAll(
            ".logout-btn"
        )
        .forEach(

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
                            "index.html";

                    });

            }

        );


    // Horarios

    const horas =
        document.querySelectorAll(
            ".hour-btn"
        );

    horas.forEach(

        btn => {

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

        }

    );


    // Agendar cita

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

                if (

                    fecha < hoy

                ) {

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
                        "Selecciona una hora"
                    );

                    return;

                }

                localStorage.setItem(

                    "citaActual",

                    JSON.stringify({

                        servicio,

                        fecha,

                        hora:
                            hora.textContent

                    })

                );

                window.location.href =
                    "confirmacion.html";

            });

    }


    // Confirmación

    const cita =
        JSON.parse(

            localStorage.getItem(
                "citaActual"
            )

        );

    if (cita) {

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
                cita.servicio;

            fecha.textContent =
                cita.fecha;

            hora.textContent =
                cita.hora;

        }

    }


    // Mis citas

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

<h3>${cita.servicio}</h3>

<span class="status-ok">

Confirmada

</span>

</div>

<p>${cita.fecha}</p>

<p>${cita.hora}</p>

<hr>

<button class="cancel-btn">

Cancelar cita

</button>

</div>

`;

    }


    // Cancelar cita

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