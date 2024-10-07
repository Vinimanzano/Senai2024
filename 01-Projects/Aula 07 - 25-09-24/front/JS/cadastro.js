const URI = "http://localhost:8080/api/professor";
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value
    };

    console.log(data);

    try {
        const response = await fetch(URI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Erro ao cadastrar');
        }

        const result = await response.json();
        console.log(result);
        
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
});
