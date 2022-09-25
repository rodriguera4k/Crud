var dados = []

function ApagaRegistro(ID) {
  let _confirm = confirm("Deseja Realmente excluir esse registro?")
  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }
    PopulaTabela()
  }
}
function EditaRegistro(ID) {
  $("#modalReg").modal("show")

  dados.forEach(function (item) {
    if (item.ID == id) {
      $("txtNome").val(item.Nome)
      $("txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
      $("txtEmail").val(item.Email)
    }
  })
}

function PopulaTabela() {
  if (Array.isArray(dados)) {

    localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tbDados tbody").html("")

    dados.forEach(function (item) {
      //TEMPLATE STRING  
      $("#tbDados tbody").append(`z<tr> 
          <td>${item.ID}</td>
          <td>${item.Nome}</td>
          <td>${item.DtNascimento}</td>
          <td>${item.Email}</td>
          <td><button type="button" class="btn btn-primary"onclick="javascript:ditaRegistro(${item.ID})>< i class="fa fa-edit" /></button></td>
          <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});">< i class="fa fa-trash" /></button></td>
      </tr>`)

    })
  }
}


$(function () {
  //EXECUTA AO CARREGAR DA TELA
  dados = JSON.parse(localStorage.getItem("__dados__"))

  if (dados) {
    PopulaTabela()
  }

  $("#btnSave").click(function () {
    //Evento Click do Botão Salvar


    let Nome = $("#txtNome").val()
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let Email = $("#txtEmail").val()


    let registro = {}

    registro.Nome = Nome
    registro.DtNascimento = DtNascimento
    registro.Email = Email



    registro.ID = dados.length + 1

    dados.push(registro)

    alert("Registro Salvo com Sucesso")
    $("#modalReg").modal("hide")



    //LIMPA CAMPO
    $("#txtNome").val("")
    $("txtDtNascimento").val("")
    $("txtEmail").val("")

    PopulaTabela()


  })




})
