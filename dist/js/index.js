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
        var t = $('#example1').DataTable({columnDefs: [
            {
                "className": "linhas",
                "targets": "_all"
            }
          ]});
        response.map((data, index) => {
            console.log(data.nome);
            t.row.add( [
                data.cpf,
                data.nome,
                data.materia,
                '<i class="far fa-calendar-alt"></i>',
                '<i class="far fa-edit"></i> <i class="far fa-trash-alt"></i>'
            ] ).draw(false);
        });
        centralizarTabela();
}
function centralizarTabela(){
    $(".linhas").css("text-align","center");
    
}