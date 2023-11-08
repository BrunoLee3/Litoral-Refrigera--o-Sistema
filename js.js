class Servico{
    constructor(nome, data, tipo, orcamento, descricao){
        this.nome = nome
        this.data = data 
        this.tipo = tipo 
        this. orcamento = orcamento 
        this.descricao = descricao 
    }

    validarDados(){
        if(this.nome == '' || this.data == '' || this.tipo == '' || this.orcamento == ''){
            return false
        }else{
            return true
        }
    }

}

class Bd{
    constructor(){
        //capturando o ID de LocalStorage
        let id = localStorage.getItem('id')
        
        //se ainda não existe um id em localStorage, cria um com valor 0
        if(id == null){
            localStorage.setItem('id', 0)
        }
    }
    
    GeraProxId(){
        let proxId = localStorage.getItem('id')
        return parseInt(proxId)+1
    }

    salvar(servico){
        //gerando próximo ID
        let id = this.GeraProxId()

        //armazenando despesa em loca storage
        localStorage.setItem(id, JSON.stringify(servico))

        //atualizando o novo valor de ID com o próximo ID gerado
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        let arrayServicos = []

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let servico = JSON.parse(localStorage.getItem(i))

            if(servico != null){
                servico.id = i
                arrayServicos.push(servico)
            }
        }
        
        return arrayServicos
    }
}

let bd = new Bd()

function cadastraServico(){
    //atribuindo os valores dos campos a variáveis
    let nome = document.getElementById('nome').value
    let data = document.getElementById('data').value
    let tipo = document.getElementById('tipo').value
    let orcamento = document.getElementById('orcamento').value
    let descricao = document.getElementById('descricao').value

    //instanciando servico com os valores dos campos como parâmetros
    let servico = new Servico(nome, data, tipo, orcamento, descricao);

    //validando os dados antes de serem cadastrados
    if(servico.validarDados()){
        alert('Serviço Cadastrado')
        // console.log(servico)
        bd.salvar(servico)
    }else{
        alert('Erro! Campos obrigatórios não foram preenchidos.')
    }
}

function exibeListaServicos(){
    let servicos = bd.recuperarTodosRegistros()
    
    listaServicos = document.getElementById('lista-despesas')

    servicos.forEach(function(s){
        let linha = listaServicos.insertRow()

        linha.insertCell(0).innerHTML = s.id
        linha.insertCell(1).innerHTML = s.nome
        linha.insertCell(2).innerHTML = s.data

        switch(s.tipo){
            case '1': s.tipo = 'Instalação'
                break
            case '2': s.tipo = 'Manutenção'
                break
            case '3': s.tipo = 'Limpeza'
                break
        }

        linha.insertCell(3).innerHTML = s.tipo
        linha.insertCell(4).innerHTML = s.orcamento
        linha.insertCell(5).innerHTML = s.descricao
    })
}
