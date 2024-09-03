function pesquisacep(cep) {
    $.ajax({
        url: 'https://viacep.com.br/ws/' + cep + '/json/',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            if (!data.erro) {
                $("#logradouro").val(data.logradouro);
                $("#bairro").val(data.bairro);
                $("#cidade").val(data.localidade);
                $("#uf").val(data.uf);
                $("#ibge").val(data.ibge);
            } else {
                alert("CEP não encontrado.");
            }
        }
    });
}