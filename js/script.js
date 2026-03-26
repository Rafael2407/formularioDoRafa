const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmar = document.getElementById("confirmar");
const barra = document.getElementById("barra");
const modal = document.getElementById("modal");

function validarNome() {
  if (nome.value.length < 3) {
    showError(nome, "nomeError");
    return false;
  }
  showSuccess(nome, "nomeError");
  return true;
}

function validarEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value)) {
    showError(email, "emailError");
    return false;
  }
  showSuccess(email, "emailError");
  return true;
}

function validarSenha() {
  const val = senha.value;
  let força = 0;

  if (val.length >= 6) força++;
  if (/[A-Z]/.test(val)) força++;
  if (/[0-9]/.test(val)) força++;

  barra.style.width = força * 33 + "%";
  barra.style.background =
    força < 2 ? "#ef4444" : força === 2 ? "#f59e0b" : "#22c55e";

  if (força < 2) {
    showError(senha, "senhaError");
    return false;
  }

  if (senha.value.length > 0) {
  document.querySelector('.strength').style.display = 'block';
}
  showSuccess(senha, "senhaError");
  return true;
}

function validarConfirmar() {
  if (senha.value !== confirmar.value || confirmar.value === "") {
    showError(confirmar, "confirmarError");
    return false;
  }
  showSuccess(confirmar, "confirmarError");
  return true;
}

function showError(input, errorId) {
  input.classList.add("error-input");
  input.classList.remove("success");
  document.getElementById(errorId).style.display = "block";
}

function showSuccess(input, errorId) {
  input.classList.remove("error-input");
  input.classList.add("success");
  document.getElementById(errorId).style.display = "none";
}

function abrirModal() {
  modal.classList.add("show");
}

function fecharModal() {
  modal.classList.remove("show");
}

nome.addEventListener("input", validarNome);
email.addEventListener("input", validarEmail);
senha.addEventListener("input", validarSenha);
confirmar.addEventListener("input", validarConfirmar);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const valid = validarNome() && validarEmail() && validarSenha() && validarConfirmar();  if (valid) {
    abrirModal();
  }
});
