const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmar = document.getElementById("confirmar");
const barra = document.getElementById("barra");
const modal = document.getElementById("modal");

function validarNome() {
  if (nome.value.trim().length < 3) {
    showError(nome, "nome-error", "Nome deve ter pelo menos 3 caracteres");
    return false;
  }
  showSuccess(nome, "nome-error");
  return true;
}

function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  if (!regex.test(email.value)) {
    showError(email, "email-error", "Digite um email válido");
    return false;
  }
  showSuccess(email, "email-error");
  return true;
}

function validarSenha() {
  const val = senha.value;
  let forca = 0;

  if (val.length >= 6) forca++;
  if (/[A-Z]/.test(val)) forca++;
  if (/[0-9]/.test(val)) forca++;

  document.querySelector(".strength").style.display =
    val.length > 0 ? "block" : "none";

  barra.style.width = forca * 33 + "%";
  barra.style.background =
    forca < 2 ? "#ef4444" : forca === 2 ? "#f59e0b" : "#22c55e";

  if (forca < 2) {
    showError(
      senha,
      "senha-error",
      "Mínimo 6 caracteres, 1 maiúscula e 1 número"
    );
    return false;
  }

  showSuccess(senha, "senha-error");
  return true;
}

function validarConfirmar() {
  if (confirmar.value !== senha.value || confirmar.value === "") {
    showError(confirmar, "confirmar-error", "As senhas não coincidem");
    return false;
  }
  showSuccess(confirmar, "confirmar-error");
  return true;
}

function showError(input, errorId, message) {
  input.classList.add("error-input");
  input.classList.remove("success");

  const error = document.getElementById(errorId);
  error.textContent = message;
  error.style.display = "block";
}

function showSuccess(input, errorId) {
  input.classList.remove("error-input");
  input.classList.add("success");

  const error = document.getElementById(errorId);
  error.textContent = "";
  error.style.display = "none";
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

nome.addEventListener("blur", validarNome);
email.addEventListener("blur", validarEmail);
senha.addEventListener("blur", validarSenha);
confirmar.addEventListener("blur", validarConfirmar);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const valid =
    validarNome() &&
    validarEmail() &&
    validarSenha() &&
    validarConfirmar();

  if (valid) {
    abrirModal();
  }
});
