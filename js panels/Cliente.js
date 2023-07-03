class Cliente{
    constructor(telefone,nome,pessoas,visitas){
        this.telefone = telefone;
        this.nome = nome;
        this.qtd_de_pessoas = pessoas;
        this.qtd_de_visitas = visitas;

        this. salvar_cliente();
    }


    salvar_cliente(){
        let nome =  this.nome 
        let telefone =  this.telefone;
        let visitas = this.qtd_de_visitas;
        let clientes = this.qtd_de_pessoas;

        firebaseConfig.database().ref("Clientes").push({
            telefone,
            nome,
            visitas,
            clientes
        })
    }
}

