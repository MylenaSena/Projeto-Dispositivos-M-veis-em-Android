// Seleciona os elementos corretamente
document.addEventListener("DOMContentLoaded", function () {
    var btnSignin = document.querySelector("#signin");
    var btnSignup = document.querySelector("#signup");
    var btnCadastrar = document.querySelector("#cadastrar");
    var btnLimpar = document.querySelector("#limpar");

    var body = document.querySelector("body");

    // Alterna entre as telas de login e cadastro
    btnSignin?.addEventListener("click", function () {
        body.classList.add("sign-in-js");
        body.classList.remove("sign-up-js");
    });

    btnSignup?.addEventListener("click", function () {
        body.classList.add("sign-up-js");
        body.classList.remove("sign-in-js");
    });

    // Limpar os campos do formulário
    btnLimpar?.addEventListener("click", function () {
        document.querySelector("#email").value = "";
        document.querySelector("#password").value = "";
    });

    // Cadastro do usuário
    btnCadastrar?.addEventListener("click", function () {
        var email = document.querySelector("#email").value;
        var password = document.querySelector("#password").value;

        if (email.trim() === "" || password.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Armazena o usuário no localStorage (simulação de banco de dados)
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_password", password);

        alert("Usuário cadastrado com sucesso!");
    });
});
