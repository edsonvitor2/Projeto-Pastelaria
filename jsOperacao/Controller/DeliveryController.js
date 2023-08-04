class DeliveryController {
  constructor(){

this.loadElements();
this.elementsPrototype();
this.initButtons();
  }

  loadElements(){

    this.el = {};

    document.querySelectorAll("[id]").forEach(element=>{
  
        this.el[Format.getCamelCase(element.id)] = element;
  
    });

  }

  elementsPrototype(){
    Element.prototype.hide = function(){
        this.style.display = "none";
    }

    Element.prototype.show = function(){
        this.style.display = "block";
    }

    Element.prototype.toggle = function(){
        this.style.display = (this.style.display === 'none') ? 'block' : 'none';
    }

    Element.prototype.on = function(events, fn){
        events.split(' ').forEach(event=>{
            this.addEventListener(event,fn);
        });
    }

    Element.prototype.css = function(styles){
        for(let name in styles){
            this.style[name] = styles[name];
        }
    }
}

initButtons(){
  this.el.enviar.on("click",event=>{
    event.preventDefault();
    this.salvarCliente();
  });

  this.el.telefoneCliente.addEventListener("keyup", () => {
    this.formatarNumero();
    this.verificarCliente();
  });


}
 
formatarNumero(){
  // Adicione o evento de digitação ao campo de telefone
  this.el.telefoneCliente.addEventListener("input", () => {
  let telefone = this.el.telefoneCliente.value;

  // Remover caracteres não numéricos do número de telefone
  telefone = telefone.replace(/\D/g, "");

  // Formatar o número de telefone conforme desejado
  let telefoneFormatado = telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

  // Definir o valor formatado no campo de telefone
  this.el.telefoneCliente.value = telefoneFormatado;
  });
    
}

verificarCliente(){
let telefone = this.el.telefoneCliente.value;
  
  // Verificar se o número de telefone já está salvo
  firebase.database().ref("clientes").orderByChild("telefone").equalTo(telefone).once("value", snapshot => {
    if (snapshot.exists()) 
    {
      snapshot.forEach(childSnapshot => {
        let clienteData = childSnapshot.val();
        // Preencher campos repetíveis com os dados do cliente
        this.el.nomeCliente.value = clienteData.cliente;
      });
    } else {
      // Nenhum cliente com o número de telefone encontrado, limpar os campos repetíveis
      this.el.nomeCliente.value = "";
    }
  });
}

salvarCliente(){
  this.el.novoCliente.hide();

  let cliente = this.el.nomeCliente.value;
  let telefone = this.el.telefoneCliente.value;
  let endereco = this.el.enderecoCliente.value;
  let complemento = this.el.Cliente.value;
  let taxa = this.el.taxaCliente.value;
 
    firebase.database().ref("clientes").push({
        cliente,
        telefone,
        endereco,
        complemento,
        taxa
    });

    this.el.nomeCliente.value = "";
    this.el.telefoneCliente.value = "";
    this.el.enderecoCliente.value = "";;
    this.el.Cliente.value = "";
    this.el.taxaCliente.value = "";

}

}

var delivery = new DeliveryController();