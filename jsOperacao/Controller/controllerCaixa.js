class Caixa{
    constructor(){

        this.initButtons();
        this.listarCaixa();
        this.listarPedidos();
    }
    initButtons(){
        let abrirCaixa = document.querySelector(".abriCaixa");

        abrirCaixa.addEventListener("click",e=>{
            this.abrirCaixa();
        });
    }

    listarPedidos(){
        firebase.database().ref("pedidos").on("value",element=>{
            element.forEach(e =>{
                let key = e.key;
                let pedido = e.pedido;
                let cliente = e.cliente;
                let status = e.status;
                let valor = e.valor;

                console.log(key);
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

    listarCaixa(){
        let table = document.querySelector(".tabelaCaixa");
        firebase.database().ref('Caixas').once("value",element=>{
            table.innerText ='';
            element.forEach(e => {
                let key = e.key;
                let data = e.val();
    
                let tr = document.createElement('tr');
    
                tr.innerHTML = ` 
                <td>ID</td>
                <td>${data.data}</td>
                <td>${data.fundoCaixa}</td>
                <td>${data.status}</td>
                <td>Total Vendido</td>
                <td>
                <button id="abrir">Abrir</button>
                </td>`;
            table.appendChild(tr);

            tr.querySelector("#abrir").addEventListener("click",e=>{
                firebase.database().ref('Caixas').child(key).on('value',e =>{
                    let dados = e.val();
                    document.querySelector("#data2").value = dados.data;
                    document.querySelector("#horainicio").value = dados.horaInicio;
                    document.querySelector("#horafim").value = dados.horaFim;
                })
            });

            });
        });
    }
}

var caixa = new Caixa();


//