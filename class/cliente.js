class Cliente {
    constructor(nome, telefone, endereco, complemento, taxa,_chaveCliente) {
      this._nome = nome;
      this._telefone = telefone;
      this._endereco = endereco;
      this._complemento = complemento;
      this._taxa = taxa;
      this._chaveCliente;
    }
    get Chave(){
        return this._chaveCliente;
    }

    set Chave(value){
        this._chaveCliente = value;
    }
    // Métodos getter e setter para Nome
    get Nome() {
      return this._nome;
    }
  
    set Nome(novoNome) {
      this._nome = novoNome;
    }
  
    // Métodos getter e setter para Telefone
    get telefone() {
      return this._telefone;
    }
  
    set telefone(novoTelefone) {
      this._telefone = novoTelefone;
    }
  
    // Métodos getter e setter para Endereço
    get endereco() {
      return this._endereco;
    }
  
    set endereco(novoEndereco) {
      this._endereco = novoEndereco;
    }
  
    // Métodos getter e setter para Complemento
    get complemento() {
      return this._complemento;
    }
  
    set complemento(novoComplemento) {
      this._complemento = novoComplemento;
    }
  
    // Métodos getter e setter para Taxa
    get taxa() {
      return this._taxa;
    }
  
    set taxa(novaTaxa) {
      this._taxa = novaTaxa;
    }
  
    salvarCliente(){
        const clienteRef = firebase.database().ref('clienteDelivery');

        clienteRef.orderByChild('telefone').equalTo(this._telefone).once('value', snapshot => {
        if (snapshot.exists()) {
            console.log('Cliente já existe. Não será salvo novamente.');

            let chaveCliente = Object.keys(snapshot.val())[0];

            this._chaveCliente = chaveCliente;

            firebase.database().ref("clienteAtivoDelivery").set({
                chaveCliente
            });

            this.mostrarDados()

            console.log('Chave do cliente existente:', this._chaveCliente);

        } else {
            // Cliente não existe, então salve os dados
            clienteRef.push({
            nome: this._nome,
            telefone: this._telefone,
            endereco: this._endereco,
            complemento: '123',
            taxa: 5.00,
            });
    
            console.log('Cliente salvo com sucesso.');
        }
        });
    }
    
    mostrarDados(){
      firebase.database().ref("clienteDelivery").child(this._chaveCliente).once("value",snapshot =>{
        let dados = snapshot.val();

        
        document.querySelector("#cliente-nome").innerText = dados.nome;

        document.querySelector("#taxa-entrega").value = dados.taxa;
      })
      
    }
  }