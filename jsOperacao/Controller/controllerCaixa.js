class Caixa{
    constructor(){
        this.idcaixa;

        this.initButtons();
        this.listarCaixa();
       
    }
    initButtons(){
        let abrirCaixa = document.querySelector(".abriCaixa");

        abrirCaixa.addEventListener("click",e=>{
            this.abrirCaixa();
        });
    }

    listarPedidos(caixa){
        firebase.database().ref("pedidos").on("value",element=>{

            let table = document.querySelector("#pedido");
            table.innerHTML = '';
            element.forEach(e =>{
                let key = e.key;
                let pedido = e.key;

                e.forEach(a=>{
                let dados = a.val();

                    if(dados.caixa == caixa){
                        let cliente = dados.cliente;
                        let formaPagamento = dados.FormaPagamento;
                        let valor = dados.valorTotalPedido;
                        let tr = document.createElement('tr');

                tr.innerHTML = ` 
                <td class="pedido">${pedido}</td>
                <td>${cliente}</td>
                <td>${valor.toFixed(2)}</td>
                <td>${formaPagamento}</td>
                <td >
                    Descrição
                </td>
                
            `;
            table.appendChild(tr);
                    }
                });
            });
        });
    }

    abrirCaixa(){
        
        let data = document.querySelector("#data").value;
        let turno = document.querySelector("#turno").value;
        let fundoCaixa = document.querySelector("#fundo").value;
        var id = 0;
        let status = "aberto"; 
        let dataAtual = new Date();
        let hora = dataAtual.getHours();
        let minutos = dataAtual.getMinutes();
        let horaInicio = `${hora}:${minutos}`;
        let horaFim = "00:00";
        
        firebase.database().ref("Caixas").push({
            id,data,turno,status,fundoCaixa,horaInicio,horaFim
        });
    }

    receberValores(id){
        console.log(id);

        
        //document.querySelector("").value = 'a';
    }

    listarCaixa(){

        let table = document.querySelector(".tabelaCaixa");
        firebase.database().ref('Caixas').once("value",element=>{
            table.innerText ='';
            element.forEach(e => {
                let key = e.key;
                let data = e.val();
    
                let tr = document.createElement('tr');
    
                tr.innerHTML = ` 
                <td class="id">${data.id}</td>
                <td>${data.data}</td>
                <td>${data.fundoCaixa}</td>
                <td>${data.status}</td>
                <td>Total Vendido</td>
                <td>
                <button id="abrir">Abrir</button>
                </td>`;
            table.appendChild(tr);

            tr.querySelector("#abrir").addEventListener("click",e=>{
                
                firebase.database().ref('Caixas').child(key).once('value',e =>{
                    let dados = e.val();
                    document.querySelector("#data2").value = dados.data;
                    document.querySelector("#horainicio").value = dados.horaInicio;
                    document.querySelector("#horafim").value = dados.horaFim;
                    let idcaixa = tr.querySelector(".id").innerText;
                    this.listarPedidos(idcaixa);
                    this.idcaixa = idcaixa;
                    this.receberValores(key);
                });
                
            });

            });
        });
    }


}

var caixa = new Caixa();


//