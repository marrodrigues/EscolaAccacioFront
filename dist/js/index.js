//FUNÇÕES PROFESSOR
function buscarProfessor(){
    axios({
        url: 'http://localhost:5000/api/professor',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response);
        return populaTabela(response.data);
      }).catch(function(error) {
        alert(error);
      });
}
function buscarMateriaProfessor(cpf){
    axios({
        url: 'http://localhost:5000/api/professor/' + cpf,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
          return response.data;
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
            t.row.add( [
                data.cpf,
                data.nome,
                data.materiaId.materia,
                '<i class="far fa-calendar-alt disponivel"></i>',
                '<i class="far fa-edit"></i> <i onclick="deletarProfessor()" class="far fa-trash-alt"></i>'
            ] ).draw(false);
        });
        centralizarTabela();
}
function buscarMateriaPorId(materiaId){
    axios({
      url: 'http://localhost:5000/api/materia/' + materiaId,
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(function(response) {
        console.log(response.data);
        return JSON.stringify(response.data);
    }).catch(function(error) {
      console.log(error);
    });
  }
function cadastrarProfessor() {
    var data = $('#schedule3').jqs('export');
    var nome = $('#nome').val();
    var cpf = $('#cpf').val();
    var materiaId = $('#materia option:selected').data('json');
    var professor = {
        nome: nome,
        cpf: cpf,
        materiaId: materiaId,
        disponibilidade: data.disponibilidade
    }
    console.log(materiaId.materia);
    enviaProfessor(professor);
}
function enviaProfessor(dados) {
    axios({
        url: 'http://localhost:5000/api/professor',
        method: 'POST',
        data: dados,
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response);
        alert("Professor cadastrado");
        document.location.href = "listaProfessor.html";
      }).catch(function(error, response) {
        console.log(error)
        alert(error.response.data);
      });
}
//FUNÇÕES MATERIA
function buscarMateria(){
    axios({
        url: 'http://localhost:5000/api/materia',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if(response.data != null){
            var select = $("#materia");
            select.find('option').remove();
            response.data.map((d, i) => {
              $('<option>').val(d.materiaId).text(d.codigo + " - " + d.materia).data("json",d).appendTo(select);
            });
        }
      }).catch(function(error) {
        console.log(error);
      });
}
function buscarTableMateria(){
    axios({
        url: 'http://localhost:5000/api/materia',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        return populaTabelaMateria(response.data);
      }).catch(function(error) {
        console.log(error);
      });
}
function populaTabelaMateria(response){
    var t = $('#example1').DataTable({columnDefs: [
        {
            "oLanguage": {
                "sEmptyTable":"Não existem matérias cadastradas"},
            "className": "linhas",
            "targets": "_all"
        }
      ]});
    response.map((data, index) => {
        t.row.add( [
            data.codigo,
            data.materia,
            data.tempo,
            '<i class="far fa-edit"></i> <i onclick="deletarMateria()" class="far fa-trash-alt"></i>'
        ] ).draw(false);
    });
    centralizarTabela();
}
function cadastrarMateria() {
    var codigo = $("#novaMateriaCodigo").val();
    var materia = $("#novaMateria").val();
    var tempo = $("#tempos-select").val();
    var data = {
        codigo: codigo,
        materia: materia,
        tempo: tempo,
        turmas: []
    }
    enviaMateria(data);
}
function enviaMateria(dados) {
    axios({
        url: 'http://localhost:5000/api/materia',
        method: 'POST',
        data: dados,
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(function(response) {
        console.log(response);
        alert("Materia cadastrada");
        document.location.href = "listaMateria.html";
      }).catch(function(error) {
        console.log(error);
      });
}
//FUNÇÕES UTIL
function centralizarTabela(){
    $(".linhas").css("text-align","center");
    
}

