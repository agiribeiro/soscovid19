function getFormData(){
    var nome = document.getElementById("field_nome").value;
    var cpf = document.getElementById("field_cpf").value;
    var cep = document.getElementById("field_cep").value;
    var estado = document.getElementById("field_estado").value;
    var cidade = document.getElementById("field_cidade").value;
    var rua = document.getElementById("field_rua").value;
    var numero = document.getElementById("field_numero").value;
    var complemento = document.getElementById("field_complemento").value;
    var bairro = document.getElementById("field_bairro").value;
    var email = document.getElementById("field_email").value;
    var telefone = document.getElementById("field_telefone").value;
    var profissao = document.getElementById("field_profissao").value;
    var registro = document.getElementById("field_registro").value;
    if(nome.length < 6){
        alert("Nome precisar ter pelo menos 6 caractéries");
        return;
    }
    if(!TestaCPF(cpf)){
        alert("CPF inválido, preencha apenas com números");
        return;
    }
    if(TestaCEP(cep)){
        alert("CEP inválido");
        return;
    }
    if(estado.length == 0){
        alert("Preencha o campo do estado corretamente")
        return;
    }
    if(cidade.length === 0){
        alert("Preencha o campo da cidade corretamente")
        return;
    }
    if(rua.length === 0){
        alert("Preencha o campo do rua corretamente")
        return;
    }
    if(bairro.length === 0){
        alert("Preencha o campo do bairro corretamente")
        return;
    }
    if(!TestaEmail(email)){
        alert("Preencha o campo do email corretamente")
        return;
    }
    if(TestaNumero(telefone) || telefone.length === 0){
        alert("Preencha o campo do telefone conforme o exemplo a seguir: (00)12345-6789")
        return;
    }
    if(profissao === " "){
        alert("Selecione sua área de atuação")
        return;
    }
    if(registro.length === 0){
        alert("Registro invalido inválido")
        return;
    }
    enviarDados();
}

//validate methods
function Trim(strTexto)
        {
            // Substitúi os espaços vazios no inicio e no fim da string por vazio.
            return strTexto.replace(/^\s+|\s+$/g, '');
        }
function TestaEmail(email) 
	{
	 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
	  {
	    return true
	  }
	    return false
	}

	function TestaNumero(telefone) 
	{
		var regex =  RegExp(/\d{2}\)\s\d{4,5}-?\d{4}/g);
		if(regex.test(telefone))
		{
			return true
		}
			return false
	}

function TestaCEP(strCEP){
    // Caso o CEP não esteja nesse formato ele é inválido!
    var objER = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;
    strCEP = Trim(strCEP)
    if(strCEP.length > 0){
            if(objER.test(strCEP))
                return true;
            else
                return false;
    }
    else 
        return false;

}
//valida o cpf conforme recomendado no site da receita federal
function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}


//send data to database
function enviarDados() {
    var uri = "https://api-covid19.imd.ufrn.br/api/teleorientacao_voluntarios";
    var formData =  $("#formularioVoluntarioSaude").serialize();
    console.log(formData);
    $.post( uri, formData )
    .done(function() {
        // sucesso. redirecionar pra página de agradecimento
        alert( "obrigado" );

        // Rediret sem colocar no history (botão voltar não volta para esse form)
        // window.location.replace("http://covid19.imd.ufrn.br/");

        // Rediret empilhando no history no history
        // window.location.href = "http://covid19.imd.ufrn.br/";
    })
    .fail(function() {
        alert( "erro" );
    });
}