const valorTotal = document.querySelector('[data-gastos="total"]');
const form = document.getElementById('input-reset');
const valorDoGasto = document.querySelector('[data-gastos="valor"]');
const btnSubmit = document.querySelector('[data-gastos="btn-submit"]');
const nomeDoGasto = document.querySelector('[data-gastos="spend"]');
const categoria = document.querySelector('[data-gastos="categoria"]');
const lista = document.querySelector('[data-gastos="lista"]');
const valorDaQuantidade = document.querySelector('[data-gastos="quantidade"]');


// ---------- Formatacao da moeda -------------

const formatador = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})


// ---------- restricao no valor digitado -----------

valorDoGasto.addEventListener('input', (event) => {
  let valor = valorDoGasto.value.replace(/\D/g, "");
  valor = (valor / 100).toFixed(2);

  if (valor === '0,00') {
    event.target.value = '';
  } else {
    event.target.value = formatador.format(valor);
  }
});


// --------- adicionarGasto --------

function adicionarGasto() {

  btnSubmit.addEventListener('click', () => {

    const gasto = {
      nome: nomeDoGasto.value,
      categoria: categoria.value,
      valor: valorDoGasto.value,
    }

    if (gasto.nome === '') return;
    if (gasto.categoria === 'Selecione' || gasto.categoria === '') return;
    if (gasto.valor === '') return;

    atualizaLista(gasto);
    form.reset();
  })
}

adicionarGasto();


// ----- atualizaLista ------

function atualizaLista(gasto) {

  const novoGasto = document.createElement('li');
  novoGasto.classList.add('spent');
  novoGasto.innerHTML = `
    <img src="./img/${gasto.categoria}.svg" alt="Ícone de tipo da gasto" />

    <div class="spent-info">
      <strong>${gasto.nome}</strong>
      <span>${gasto.categoria}</span>
    </div>

    <span class="spent-amount"><small>R$</small>${gasto.valor.replace('R$', '')}</span>

    <img data-gastos="remover" src="./img/remove.svg" alt="remover" class="remove-icon" />
  `;

  lista.appendChild(novoGasto)
  atualizaQuantidade();
  atualizaTotal();
}


//------------ atualiza quantidade ------

function atualizaQuantidade() {
  const gastoDaLista = document.querySelectorAll('[data-gastos="lista"] li');

  valorDaQuantidade.innerHTML = `${gastoDaLista.length} gastos`;
}

atualizaQuantidade();


// -------------- atualiza total ---------

function atualizaTotal() {

  const valorGastado = document.querySelectorAll('[data-gastos="lista"] .spent-amount');

  let soma = 0;

  valorGastado.forEach((valor) => {
    valor = valor.textContent.replace(/[^0-9,]/g, '').replace(',', '.')
    valor = Number(valor);
    soma += valor;
  });

  valorTotal.innerHTML = `<small>R$</small>${formatador.format(soma).replace(/\s/g, '').replace('R$', '')}`
}

atualizaTotal();

// ------------  remover gastos -----------

function removerGasto() {

  lista.addEventListener('click', (event) => {
    if (event.target.matches('[data-gastos="remover"]')) {
      const itemRemovido = event.target.closest('li');

      itemRemovido.remove();

      console.log('item removido')

      atualizaQuantidade();
      atualizaTotal();
    }
  })
}

removerGasto();
