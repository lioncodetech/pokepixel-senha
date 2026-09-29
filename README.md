# PokePixel — senha

Guarda a sua senha do PokePixel e a cola no campo de login com um clique.

As janelas do LionMultInstance não têm o gerenciador de senhas do Chrome, então hoje a senha é
digitada à mão em cada janela, toda vez. Esta extensão resolve isso.

## Leia antes de usar

**A senha é guardada em texto puro**, sem senha-mestra. Quem tiver acesso ao seu computador pode
ler o arquivo — e, mais direto que isso, pode simplesmente clicar no botão e entrar na sua conta.

É a mesma troca de qualquer atalho de senha: comodidade em lugar de proteção. **Use só para este
jogo.** Senha de banco, e-mail ou qualquer coisa séria, não.

## Como usar

O par de botões aparece no canto inferior direito **só na tela de login**, e some quando você
entra, para não atrapalhar o jogo.

- **definir** — abre o campinho. Digite a senha e aperte Enter.
- **Colar senha** — preenche o campo de senha da página.
- Para apagar: **definir**, e depois **apagar** com o campo vazio.
- **⠿** — arraste para mover os botões. A posição é lembrada.

## O que ela acessa

Guarda duas coisas: a senha e a posição dos botões na tela. Quando o navegador oferece
armazenamento próprio de extensão, é lá que ficam — fora do alcance da página do jogo. Quando não
oferece, cai para o armazenamento da própria página, que **a página consegue ler**.

Lê a página só para achar o campo de senha visível (`input[type="password"]`).

Não faz nenhuma chamada de rede. A senha não sai do seu computador: não existe servidor, conta nem
sincronização nesta extensão.

## Onde funciona

`pokepixel.nietore.com` e `poke.idleworld.online`. Em qualquer outro site ela não é carregada.

## Instalação

Pela loja de extensões do LionMultInstance, ou à mão: baixe o `.zip` da
[última release](../../releases/latest), descompacte numa pasta e aponte a extensão da janela para
ela.

Ao lado do `.zip` há um arquivo `.sha256`, para conferir que o pacote baixado é exatamente o que
foi publicado aqui.
