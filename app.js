let txt = document.getElementById('txt');
let ext = document.getElementById('ext');
let imagem = document.getElementById('imagem');
let mensagemSemTexto = document.getElementById('secao__dois__mensagem__sem__texto');
let mensagemSemTexto2 = document.getElementById('secao__dois__mensagem__sem__texto__2');
let botaoCriptografar = document.getElementById("criptografar");
let botaoDescriptografar = document.getElementById("descriptografar");
let botaoCopiar = document.getElementById("copiar");
txt.value = '';

function possuiLetrasMaiusculas(texto) {
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= 'A' && texto[i] <= 'Z') {
      return true;
    }
  }
  return false;
}

function possuiAcentos(texto) {
  const regexCaracteresEspeciais = /[áéíóúãõâêîôûàèìòùäëïöüñ^~´`#$%¨&*()_/\|+=ºª@]/i;
  return regexCaracteresEspeciais.test(texto);
}

function verificarTexto(texto) {
  return texto.trim() === '';
}

function exibirMensagemErro(mensagem) {
  ext.value = mensagem;
  imagem.style.backgroundImage = 'none';
  imagem.style.color = 'initial';
  botaoCriptografar.disabled = false;
  botaoDescriptografar.disabled = false;   
  botaoCopiar.disabled = true;
  mensagemSemTexto.value = '';
  mensagemSemTexto2.value = '';
}

function semMensagem(){
    ext.value = '';
    imagem.style.backgroundImage = "url('./assets/sem_texto.svg')";
    imagem.style.backgroundSize = '100% 100%';
    imagem.style.backgroundPosition = 'center';
    imagem.style.color = 'transparent'; 
    imagem.style.maxWidth = '336px';
    imagem.style.maxHeight = '304px';
    mensagemSemTexto.value = 'Nenhuma mensagem encontrada';
    mensagemSemTexto2.value = 'Digite um texto que você deseja criptografar ou descriptografar.'; 
    botaoCriptografar.disabled = false;
    botaoDescriptografar.disabled = false;
    botaoCopiar.disabled = true;
}

function atualizarTextoExibicao() {
  ext.value = txt.value;
  imagem.style.backgroundImage = 'none';
  imagem.style.color = 'initial';
}

function reiniciar(){
  txt.value = '';
  ext.value = '';
  imagem.style.backgroundImage = 'none';
  imagem.style.color = 'initial';
  botaoCriptografar.disabled = false;
  botaoDescriptografar.disabled = false;   
  botaoCopiar.disabled = false;
  mensagemSemTexto.value = '';
  mensagemSemTexto2.value = '';
}

function criptografar() {
  if (verificarTexto(txt.value)) {
      semMensagem();

  } else if (!possuiLetrasMaiusculas(txt.value) && !possuiAcentos(txt.value) && !verificarTexto(txt.value)) {
    const substituicoes = {
      'e': 'enter',
      'i': 'imes',
      'a': 'ai',
      'o': 'ober',
      'u': 'ufat'
    };

    const caracteres = txt.value.split('');
    for (let i = 0; i < caracteres.length; i++) {
      const substituicao = substituicoes[caracteres[i]];
      if (substituicao) {
        caracteres[i] = substituicao;
      }
    }
    botaoCriptografar.disabled = true;
    botaoDescriptografar.disabled = false;
    mensagemSemTexto.value = '';
    mensagemSemTexto2.value = '';
    botaoCopiar.disabled = false;
    txt.value = caracteres.join('');
    atualizarTextoExibicao();
  } else {
    exibirMensagemErro('Não foi possível decodificar esse texto pois ele tem acentos gráficos ou letras maiúsculas!');
    
  }
  
}

function descriptografar() {
  if (verificarTexto(txt.value)) {
    semMensagem();
    

  } else if (!possuiLetrasMaiusculas(txt.value) && !possuiAcentos(txt.value) && !verificarTexto(txt.value)) {
    const substituicoesInvertidas = {
      'enter': 'e',
      'imes': 'i',
      'ai': 'a',
      'ober': 'o',
      'ufat': 'u'
    };
    botaoDescriptografar.disabled = true;
    botaoCriptografar.disabled = false;
    mensagemSemTexto.value = '';
    mensagemSemTexto2.value = '';
    botaoCopiar.disabled = false;
    txt.value = txt.value.replace(/enter|imes|ai|ober|ufat/g, match => substituicoesInvertidas[match]);
    ext.value = txt.value;
    atualizarTextoExibicao();
  } else {
    exibirMensagemErro('Não foi possível decodificar esse texto pois ele tem acentos gráficos ou letras maiúsculas!');    
  }
  
}

function copiar() {
  var textoCopiado = document.getElementById('ext');

  textoCopiado.select();
  textoCopiado.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textoCopiado.value);

  alert("Texto copiado para a área de transferência");
}
