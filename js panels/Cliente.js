class Cliente{
    constructor(nome, telefone, visitas, pessoas){

        this.nome = nome;
        this.telefone = telefone;
        this.visitas = visitas;
        this.pessoas = pessoas;

        this.salvar_cliente();
    }


    salvar_cliente(){
        let nome = this.nome;
        let telefone = this.telefone;
        let visitas = this.visitas;
        let pessoas = this.pessoas;

firebase.database().ref("clientes").push({
    nome,
    telefone,
    visitas,
    pessoas
});
}

}

