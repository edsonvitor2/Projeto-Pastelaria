class VilaController{
    constructor(){
        this.cardapio = firebase.database().ref("cardapio");

        this.carrinho = firebase.database().ref("carrinho-balcao");


        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        this.initCardapio();
        this.listCart();
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

    initEvents(){
        this.el.abrirPainel.on('click',e=>{
            this.el.criarClientes.show();
        });

        this.el.fecharPainel.on('click',e=>{
            this.el.criarClientes.hide();
        });

        this.el.pastel.on('click',e=>{
            this.el.montar.toggle();
        });
    }

    initCardapio(){
        this.cardapio.once('value').then((snapshot)=>{
            snapshot.forEach(e=>{

                let key = e.key;
                let data = e.val();

                this.listarCardapio(key,data);

            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    listarCardapio(key,data){
        let table = document.querySelector(".montar");

        //table.innerText ='';

        let tr = document.createElement('tr');

        tr.innerHTML = ` 
        <td>
            ${data.produto}
        </td>
        <td>
            <button class="btnSubtract">-</button>
        </td>
        <td>
            <input type="text" name="" id="" class="quantidade" value="0">
        </td>
        <td>
            <button class="btnAdd">+</button>
        </td>
        <td>
        ${data.valor.toFixed(2)}
        </td>
        <td>
            <img src="/icones/iconCarrinho.png" width="40px" class="btnCarrinho">
        </td>
        <td>
            <img src="/icones/iconAdc.png" alt="" width="40px">
        </td>
        `;
        table.appendChild(tr);
            //aqui envia o produto para o carrinho
        tr.querySelector(".btnCarrinho").addEventListener("click", e=>{
            let quantidade = tr.querySelector(".quantidade").value;
            let produto = data.produto;
            let valor = quantidade * data.valor;
            let valorFim = valor.toFixed(2);

            this.createCart(produto,quantidade,valorFim);
        });

            //aqui adiciona +1 a quantidade de pasteis
        tr.querySelector(".btnAdd").addEventListener("click", e=>{
            let n1 = parseInt(tr.querySelector(".quantidade").value);
            let result = n1 + 1;
            tr.querySelector(".quantidade").value = result;
        });

            //aqui subtrai 1 a quantidade de pasteis
        tr.querySelector(".btnSubtract").addEventListener("click", e=>{
            let n1 = parseInt(tr.querySelector(".quantidade").value);
            if(n1==0){
                return false
            }else{
                let result = n1 - 1;
                tr.querySelector(".quantidade").value = result;
            }
            
        });

    }

    createCart(produto,quantidade,valor){
        this.carrinho.push({
            produto,quantidade,valor
        });
        this.listCart();
    }
    
    listCart(){
        let table = document.querySelector("#Carrinho");

        this.carrinho.on("value",element=>{
            table.innerText ='';
            element.forEach(e=>{

                let data = e.val();
                console.log(data);
                let tr = document.createElement("tr");

                tr.innerHTML = `
                <td>
                ${data.produto}
                </td>
                <td>
                    ${data.quantidade}
                </td>
                <td>
                    ${data.valor}
                </td>
                
                `;
                table.appendChild(tr);
            });
        });
    }
    
}
