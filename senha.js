(() => {
  const CHAVE = 'pp-senha';
  const CHAVE_POS = 'pp-senha-pos';
  const api = globalThis.chrome && chrome.storage && chrome.storage.local;

  // O chrome.storage do Electron responde por callback, nao por promessa. Chamar so a forma
  // moderna deixava o botao travado no primeiro passo, sem erro visivel.
  const pedir = (metodo, arg) =>
    new Promise((ok, falhou) => {
      if (!api) return ok(null);
      try {
        const r = api[metodo](arg, (valor) => ok(valor));
        if (r && typeof r.then === 'function') r.then(ok, falhou);
      } catch (e) {
        falhou(e);
      }
    });

  const guardar = async (chave, valor) => {
    if (api) return pedir('set', { [chave]: valor });
    localStorage.setItem(chave, typeof valor === 'string' ? valor : JSON.stringify(valor));
  };
  const ler = async (chave) => {
    if (api) return (await pedir('get', chave))?.[chave] ?? '';
    const bruto = localStorage.getItem(chave);
    if (bruto === null) return '';
    try {
      return chave === CHAVE_POS ? JSON.parse(bruto) : bruto;
    } catch (e) {
      return '';
    }
  };
  const apagar = async (chave) => {
    if (api) return pedir('remove', chave);
    localStorage.removeItem(chave);
  };

  const caixa = document.createElement('div');
  caixa.style.cssText =
    'position:fixed;right:14px;bottom:14px;z-index:2147483647;display:none;gap:6px;' +
    'align-items:center;font:13px system-ui,sans-serif;user-select:none';
  const estiloBotao =
    'background:#1d2433;color:#e6e9ef;border:1px solid #3a4152;border-radius:8px;' +
    'padding:7px 12px;cursor:pointer';

  const alca = document.createElement('span');
  alca.textContent = '⠿';
  alca.title = 'Arraste daqui para mover';
  alca.style.cssText =
    'color:#8b93a5;padding:4px 6px;font-size:15px;cursor:move;touch-action:none;' +
    'background:#1d2433;border:1px solid #3a4152;border-radius:8px';

  const botao = document.createElement('button');
  botao.textContent = 'Colar senha';
  botao.style.cssText = estiloBotao;

  const engrenagem = document.createElement('button');
  engrenagem.textContent = 'definir';
  engrenagem.style.cssText = estiloBotao;

  const entrada = document.createElement('input');
  entrada.type = 'password';
  entrada.placeholder = 'senha, e Enter';
  entrada.style.cssText =
    'display:none;background:#11151d;color:#e6e9ef;border:1px solid #3a4152;' +
    'border-radius:8px;padding:7px 10px;width:170px';

  const recado = (alvo, texto, voltarPara) => {
    alvo.textContent = texto;
    setTimeout(() => (alvo.textContent = voltarPara), 2500);
  };
  // Erro visivel no proprio botao: falha silenciosa nao da pista nenhuma de onde olhar.
  const comAviso = (fn, alvo, voltarPara) => async () => {
    try {
      await fn();
    } catch (e) {
      recado(alvo, 'erro: ' + String(e && e.message ? e.message : e).slice(0, 40), voltarPara);
    }
  };

  const campoSenha = () =>
    [...document.querySelectorAll('input[type="password"]')].find(
      (el) => el.offsetParent !== null && el !== entrada,
    ) || null;

  // React nao percebe uma atribuicao direta em .value: e preciso usar o setter nativo do
  // elemento e avisar a pagina, senao o formulario continua achando que o campo esta vazio.
  const preencher = (campo, valor) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(campo, valor);
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    campo.dispatchEvent(new Event('change', { bubbles: true }));
  };

  botao.onclick = comAviso(
    async () => {
      const campo = campoSenha();
      if (!campo) return recado(botao, 'sem campo', 'Colar senha');
      const senha = await ler(CHAVE);
      if (!senha) return recado(botao, 'nada guardado', 'Colar senha');
      preencher(campo, senha);
      campo.focus();
      recado(botao, 'colada', 'Colar senha');
    },
    botao,
    'Colar senha',
  );

  engrenagem.onclick = comAviso(
    async () => {
      if (entrada.style.display === 'none') {
        entrada.style.display = 'block';
        entrada.value = '';
        entrada.focus();
        engrenagem.textContent = 'apagar';
        return;
      }
      if (!entrada.value) {
        await apagar(CHAVE);
        recado(botao, 'apagada', 'Colar senha');
      }
      entrada.style.display = 'none';
      engrenagem.textContent = 'definir';
    },
    engrenagem,
    'definir',
  );

  entrada.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter' || !entrada.value) return;
    e.preventDefault();
    try {
      await guardar(CHAVE, entrada.value);
      recado(botao, 'guardada', 'Colar senha');
    } catch (err) {
      recado(botao, 'erro ao guardar', 'Colar senha');
    }
    entrada.value = '';
    entrada.style.display = 'none';
    engrenagem.textContent = 'definir';
  });

  // Uma janela menor, ou um monitor trocado, nao pode deixar o botao fora do alcance.
  const posicionar = (x, y) => {
    const r = caixa.getBoundingClientRect();
    caixa.style.left = Math.min(Math.max(0, x), Math.max(0, innerWidth - r.width)) + 'px';
    caixa.style.top = Math.min(Math.max(0, y), Math.max(0, innerHeight - r.height)) + 'px';
    caixa.style.right = 'auto';
    caixa.style.bottom = 'auto';
  };

  let dx = 0;
  let dy = 0;
  let arrastando = false;
  alca.addEventListener('pointerdown', (e) => {
    const r = caixa.getBoundingClientRect();
    dx = e.clientX - r.left;
    dy = e.clientY - r.top;
    arrastando = true;
    alca.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  alca.addEventListener('pointermove', (e) => {
    if (arrastando) posicionar(e.clientX - dx, e.clientY - dy);
  });
  const soltar = (e) => {
    if (!arrastando) return;
    arrastando = false;
    try {
      alca.releasePointerCapture(e.pointerId);
    } catch (err) {
      /* ponteiro ja solto */
    }
    void guardar(CHAVE_POS, {
      x: parseFloat(caixa.style.left),
      y: parseFloat(caixa.style.top),
    });
  };
  alca.addEventListener('pointerup', soltar);
  alca.addEventListener('pointercancel', soltar);

  caixa.append(alca, entrada, engrenagem, botao);
  document.body.appendChild(caixa);

  let salva = null;
  void ler(CHAVE_POS).then((pos) => {
    if (pos && typeof pos.x === 'number') salva = pos;
  });

  // O par de botoes so aparece onde ha senha para digitar, para nao atrapalhar o jogo.
  let visivel = false;
  setInterval(() => {
    const deveAparecer = !!campoSenha();
    if (deveAparecer === visivel) return;
    visivel = deveAparecer;
    caixa.style.display = deveAparecer ? 'flex' : 'none';
    if (deveAparecer && salva) posicionar(salva.x, salva.y);
  }, 1000);
})();
