function buscarProfessor(){
    axios({
        url: 'http://localhost:5000/api/professor',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return populaTabela(response.data);
      }).catch(function(error) {
        console.log(error);
      });
}
function populaTabela(response){
    console.log('data', response);
        var t = $('#example1').DataTable();
        response.map((data, index) => {
            console.log(data.nome);
            t.row.add( [
                data.cpf,
                data.nome,
                data.materia,
                data.materia,
                data.materia
            ] ).draw( false );
        });
}