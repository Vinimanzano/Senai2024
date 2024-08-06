const API_BASE_URL = 'http://localhost:3000';
const fetchProtectedData = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const response = await fetch(`${API_BASE_URL}/some-protected-route`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao acessar dados protegidos');
    }

    return response.json();
};

fetchProtectedData().then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});
