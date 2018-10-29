//FUNÇÕES PROFESSOR
function buscarProfessor() {
    axios({
        url: 'http://localhost:5000/api/professor',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        return populaTabelaProfessor(response.data);
    }).catch(function (error) {
        alert(error);
    });
}

function buscarMateriaProfessor(cpf) {
    axios({
        url: 'http://localhost:5000/api/professor/' + cpf,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
    });
}

function populaTabelaProfessor(response) {
    var t = $('#example1').DataTable({
        columnDefs: [
            {
                "oLanguage": {
                    "sEmptyTable": "Não existem professores cadastrados"
                },
                "className": "linhas",
                "targets": "_all"
            }
        ]
    });
    response.map((data, index) => {
        t.row.add([
            data.cpf,
            data.nome,
            data.materiaId.materia,
            '<i class="far fa-calendar-alt disponivel"></i>',
            '<i class="far fa-edit"></i> <i onclick="deletarProfessor()" class="far fa-trash-alt"></i>'
        ]).draw(false);
    });
}

function buscarMateriaPorId(materiaId) {
    axios({
        url: 'http://localhost:5000/api/materia/' + materiaId,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response.data);
        return JSON.stringify(response.data);
    }).catch(function (error) {
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
    }).then(function (response) {
        console.log(response);
        alert("Professor cadastrado");
        document.location.href = "listaProfessor.html";
    }).catch(function (error, response) {
        console.log(error)
        alert(error.response.data);
    });
}

//FUNÇÕES MATERIA

function buscarMateria(id) {
    axios({
        url: 'http://localhost:5000/api/materia',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.data != null) {
            var select = $(id);
            select.find('option').remove();
            response.data.map((d, i) => {
                $('<option>').val(d.materiaId).text(d.codigo + " - " + d.materia).data("json", d).appendTo(select);
            });
        }
    }).catch(function (error) {
        console.log(error);
    });
}

function buscarTableMateria() {
    axios({
        url: 'http://localhost:5000/api/materia',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return populaTabelaMateria(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}

function populaTabelaMateria(response) {
    var t = $('#example1').DataTable({
        columnDefs: [
            {
                "oLanguage": {
                    "sEmptyTable": "Não existem matérias cadastradas"
                },
                "className": "linhas",
                "targets": "_all"
            }
        ]
    });
    response.map((data, index) => {
        t.row.add([
            data.codigo,
            data.materia,
            data.tempo,
            '<i class="far fa-edit"></i> <i onclick="deletarMateria()" class="far fa-trash-alt"></i>'
        ]).draw(false);
    });
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
    }).then(function (response) {
        console.log(response);
        alert("Materia cadastrada");
        document.location.href = "listaMateria.html";
    }).catch(function (error) {
        console.log(error);
    });
}

//FUNÇÕES TURMA

function buscarTurma() {
    axios({
        url: 'http://localhost:5000/api/turma',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        return populaTabelaTurma(response.data);
    }).catch(function (error) {
        alert(error);
    });
}

function cadastrarTurma(){
    var codigo = $('#codigoMateria').val();
    var mat1 = $('#1materia option:selected').data('json');
    var mat2 = $('#2materia option:selected').data('json');
    var mat3 = $('#3materia option:selected').data('json');
    var mat4 = $('#4materia option:selected').data('json');
    var mat5 = $('#5materia option:selected').data('json');
    var mat6 = $('#6materia option:selected').data('json');
    var qtd = mat1.tempo + mat2.tempo + mat3.tempo + mat4.tempo + mat5.tempo + mat6.tempo;
    var serie = $('#serie-select').val()
    var materias =[];
    materias.push(mat1);
    materias.push(mat2);
    materias.push(mat3);
    materias.push(mat4);
    materias.push(mat5);
    materias.push(mat6);
    var turma = {
        codigo: codigo,
        creditos: qtd,
        serie: serie,
        materias: materias
    }
    enviaTurma(turma);
}
function calculaCredito() {
    var mat1 = $('#1materia option:selected').data('json').tempo;
    var mat2 = $('#2materia option:selected').data('json').tempo;
    var mat3 = $('#3materia option:selected').data('json').tempo;
    var mat4 = $('#4materia option:selected').data('json').tempo;
    var mat5 = $('#5materia option:selected').data('json').tempo;
    var mat6 = $('#6materia option:selected').data('json').tempo;
    var qtd = mat1 + mat2 + mat3 + mat4 + mat5 + mat6;
    $('#qtdCredito').html('<strong>Creditos da turma: ' + qtd +'</strong>');
    if(qtd > 20){
        $('#qtdCredito').css('color', 'red');
        $(".salvar").addClass('disabled');
        $(".salvar").attr("disabled", "true");
    }else{
        $('#qtdCredito').css('color', 'black');
        $(".salvar").removeClass('disabled');
        $(".salvar").removeAttr("disabled");
    }
}

function enviaTurma(dados) {
    console.log(dados);
    axios({
        url: 'http://localhost:5000/api/turma',
        method: 'POST',
        data: dados,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response);
        alert("Turma cadastrada");
        document.location.href = "listaTurma.html";
    }).catch(function (error) {
        console.log(error);
    });
}

function populaTabelaTurma(response) {
    var t = $('#example1').DataTable({
        columnDefs: [
            {
                "oLanguage": {
                    "sEmptyTable": "Não existem turmas cadastradas"
                },
                "className": "linhas",
                "targets": "_all"
            }
        ]
    });
    response.map((data, index) => {
        t.row.add([
            data.codigo,
            data.creditos,
            data.serie + 'º Ano',
            '<i class="far fa-calendar-alt disponivel"></i>',
            '<i class="far fa-edit"></i> <i onclick="deletarProfessor()" class="far fa-trash-alt"></i>'
        ]).draw(false);
    });
}


