// Primeira coisa a fazer é pegar o Canvas e o configurar com a função load.
// A arrow function vai definir tudo que será carregado junto com o canvas.

window.addEventListener("load", () => {
    //Configurações de Cena e imagem.
    const   canvas      = document.querySelector('#meuCanvas');
    let     ctx         = canvas.getContext('2d');
    let     imagem      = document.createElement('img');

    var mouseAtivo = false;

    imagem.src     =  'imagem.png';

    imagem.onload = function(){
        ctx.drawImage(imagem, 100, 100, 500, 300);
        //Define mouse desativado por padrão.

        //Mouse Ativo.
        canvas.onmousedown = function(e){
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
            mouseAtivo = true;
        }

        //Mouse Desativo.
        canvas.onmouseup = function(e){
            mouseAtivo = false;
        }

        //Mouse em movimento.
        canvas.onmousemove  = function(e){
            if (!mouseAtivo) return
                
            //Define cor do nosso lápis.
            ctx.strokeStyle = "white";
            ctx.lineWidth   = 10;
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            
        }
    }


    //NOVA FUNCIONALIDADE --------------------------------------------------------- 
    //Enviar 

    let arquivos = document.querySelector('input');

    //Verificando se arquivos são válidos.
    arquivos.onchange = function(e){
        let arquivos  = e.target;
        let leitor   = new FileReader();
        leitor.onload = function(){
            const resultado = leitor.result;
            imagem.src = resultado;
        }
            leitor.readAsDataURL(arquivos.files[0]);
    };

    
});


//Baixar imagem.
async function baixarImagem(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image file name here'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

