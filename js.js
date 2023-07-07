function validaServico(idNome, idData, idOrc, idServ) {
    let nomeCliente = document.getElementById(idNome).value;
    let date = document.getElementById(idData).value;
    let orcamento = document.getElementById(idOrc).value;
    let ser = document.getElementById(idServ).value
    


    if(nomeCliente == "")
        alert("Erro. Nome do Cliente não pode estar em branco.");
    
    else if(date == "")
        alert("Erro. Data não pode estar em branco.");
    
    else if(orcamento == "")
        alert("Erro. orcamento não pode estar em branco.");
    
    else if(ser == "")
        alert("Erro. serviço não pode estar em branco.");
    
    else
        salvaServico(nomeCliente, date, parseFloat(orcamento), ser);

}

function salvaServico(cliente, date, orcamento, servico){
    let novoServico = {nome:cliente, data:date, orcamento: orcamento, Servico:servico};
    
     if(typeof(Storage) !== "undefined"){
        let servicos = localStorage.getItem("servicos");
        if(servicos == null) servicos = [];  
        else
            servicos = JSON.parse(servicos);
            servicos.push(novoServico);
            localStorage.setItem("servicos", JSON.stringify(servicos))
            alert("Serviço cadastrado com sucesso!");
            location.reload();
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");

}


function exibeServico(){
    let servicos = localStorage.getItem("servicos")
    if(servicos==null){
       document.write("<h2>Não há nenhum serviço cadastrado</h2>");
    }
    else{
        servicos = JSON.parse(servicos);
        let contador = 1;
        document.write("<h1>Lista de Atendimentos Registrados</h1>");
        
        servicos.forEach(servs => {
            document.write("<ul>");
            document.write("<li><strong>Código: </strong>"+ contador + "</li>");
            document.write("<li><strong>Nome: </strong>" +servs.nome+ "</li>");
            document.write("<li><strong>Data: </strong>" +servs.data+ "</li>");
            document.write("<li><strong>Orçamento: </strong>" +servs.orcamento+ "</li>");
            document.write("<li><strong>Serviço: </strong>" +servs.Servico+ "</li>");
            document.write("<hr>")
            document.write("</ul>");
            contador++;
        });
    }
}