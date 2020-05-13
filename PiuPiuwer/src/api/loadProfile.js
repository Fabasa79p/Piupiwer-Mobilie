export async function loadProfile(id) {
    let link
    if (id == null) { link = 'http://piupiuwer.polijr.com.br/usuarios/' } else { link = `http://piupiuwer.polijr.com.br/usuarios/${id}/` }
    try {
        let response = await fetch(
            link,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();
        // Imprime os dados obtidos:
        return await data;

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return console.log('Sorry, something went wrong.', error.message);
    }
}