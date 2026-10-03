# PokePixel — senha

Guarda o seu usuário e a sua senha do PokePixel e os cola nos campos de login com um clique.

As janelas do LionMultInstance não têm o gerenciador de senhas do Chrome, então hoje o login é
digitado à mão em cada janela, toda vez. Esta extensão resolve isso.

## Leia antes de usar

**O usuário e a senha são guardados em texto puro**, sem senha-mestra. Quem tiver acesso ao
seu computador pode ler o arquivo — e, mais direto que isso, pode simplesmente clicar no
botão e entrar na sua conta.

É a mesma troca de qualquer atalho de senha: comodidade em lugar de proteção. **Use só para este
jogo.** Senha de banco, e-mail ou qualquer coisa séria, não.

## Como usar

O par de botões aparece no canto inferior direito **só na tela de login**, e some quando você
entra, para não atrapalhar o jogo.

- **definir** — abre os dois campinhos. Digite o usuário, Enter, a senha, Enter.
- **Colar login** — preenche o usuário e a senha da página.
- Para trocar só um dos dois: **definir**, preencha só aquele e aperte Enter. O campo
  deixado em branco mantém o que estava guardado. O usuário já aparece escrito, para dar para
  corrigi-lo sem redigitar; a senha nunca volta para a tela.
- Para apagar os dois: **definir**, limpe o usuário e depois **apagar** com os dois campos vazios.
- **⠿** — arraste para mover os botões. A posição é lembrada.
- Se a janela encolher — rearranjo das views —, os botões voltam para dentro dela, em vez de
  ficarem pendurados fora, onde não dá para clicar.

## O que ela acessa

Guarda três coisas: o usuário, a senha e a posição dos botões na tela. Quando o navegador oferece
armazenamento próprio de extensão, é lá que ficam — fora do alcance da página do jogo. Quando não
oferece, cai para o armazenamento da própria página, que **a página consegue ler**.

Lê a página só para achar os dois campos de login.

O de senha é o `input[type="password"]` visível, menos os marcados `new-password`: na tela de
**criar conta** os botões nem aparecem, porque isto serve para entrar, não para se cadastrar.

O de usuário é achado primeiro pela marca que o próprio navegador usa — `autocomplete="username"`,
que é o que a tela do PokePixel traz. Sem marca nenhuma, sobra a posição: o campo de digitar logo
antes da senha, procurado **só nos arredores dela** (o formulário, ou os poucos níveis acima quando
não há formulário). Numa tela que pede só a senha ela cola só a senha e avisa *sem campo de
usuário* — nunca escreve o usuário num campo de outra parte da página, como a caixa de busca.

Não faz nenhuma chamada de rede. O seu login não sai do seu computador: não existe
servidor, conta nem sincronização nesta extensão.

## Onde funciona

`pokepixel.nietore.com` e `poke.idleworld.online`. Em qualquer outro site ela não é carregada.

## Transparência

A caixa fica um pouco transparente em repouso, para não tapar o jogo atrás dela, e volta ao normal
assim que o mouse ou o cursor de texto chega perto. Os avisos rápidos, que somem sozinhos, ficam
sempre no mesmo meio-termo.

## Instalação

Pela loja de extensões do LionMultInstance, ou à mão: baixe o `.zip` da
[última release](../../releases/latest), descompacte numa pasta e aponte a extensão da janela para
ela.

Ao lado do `.zip` há um arquivo `.sha256`, para conferir que o pacote baixado é exatamente o que
foi publicado aqui.
