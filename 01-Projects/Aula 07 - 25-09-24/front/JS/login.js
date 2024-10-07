const URI = "http://localhost:8080/api/professor/login";
const form = document.querySelector("form");

form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const data = {
        email: form.email.value,
        senha: form.senha.value
    };

    console.log(data);

    await fetch(URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Email ou senha incorretos');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.localStorage.setItem('userData', JSON.stringify(data));
        window.location.href = 'professor.html';

    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
});
