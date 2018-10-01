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
        var cpf = response.data.cpf;
        var nome = response.data.nome;
        var materia = buscarMateriaProfessor(cpf);
        var data = {
            nome: nome,
            cpf: cpf,
            materia: materia.materiaId
        }
        return populaTabela(response.data);
      }).catch(function(error) {
        console.log(error);
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
                cpf,
                nome,
                materia,
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
    var materiaId = $('#materia').val();
    var materia = buscarMateriaPorId(materiaId);
    var professor = {
        nome: data.nome,
        cpf: data.cpf,
        materiaId: materia,
        disponibilidade: data.disponibilidade
    }
    console.log(professor);
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
      }).catch(function(error) {
        console.log(error);
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
              $('<option>').val(d.materiaId).text(d.materia).appendTo(select);
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
            "className": "linhas",
            "targets": "_all"
        }
      ]});
    response.map((data, index) => {
        t.row.add( [
            data.materia,
            data.tempo,
            '<i class="far fa-edit"></i> <i onclick="deletarProfessor()" class="far fa-trash-alt"></i>'
        ] ).draw(false);
    });
    centralizarTabela();
}
function cadastrarMateria() {
    var materia = $("#novaMateria").val();
    var tempo = $("#tempos-select").val();
    var data = {
        materia: materia,
        tempo: tempo
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
      }).catch(function(error) {
        console.log(error);
      });
}
//FUNÇÕES UTIL
function centralizarTabela(){
    $(".linhas").css("text-align","center");
    
}

