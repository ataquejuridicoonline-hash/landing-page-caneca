# FinaSub — Canecas personalizadas no atacado

Landing page Next.js / React / TypeScript. Pedido mínimo: **10 unidades**.
Sem venda unitária, carrinho ou checkout. Atendimento neutro, sem WhatsApp.

## Desenvolvimento
Node.js 22 ou 24:
```
npm install
npm run dev
npm run build
npm run typecheck
```

## Configurar atendimento
Edite `lib/config.ts` e preencha `chatUrl` com o link confirmado da página Messenger ou Instagram Direct.
O formulário não envia dados para servidores. Gera um resumo copiável.
Até configurar o chat, a página mostra honestamente "Atendimento em preparação".
Messenger não recebe automaticamente o texto completo do resumo por URL: o cliente copia e cola a mensagem.
Nenhum Pixel ou Clarity está instalado. O código emite eventos locais `finasub:event` como pontos de integração sem dados pessoais. Para ativar ferramentas de marketing, implementar consentimento antes de carregar scripts.
Não usar clique de chat como venda ou conversa confirmada.

## Antes de campanhas
- Configurar e testar o chat real em celular.
- Confirmar marca e substituir identificação tipográfica pela logomarca oficial se desejado.
- Incluir dados empresariais e contato do controlador na política de privacidade.
- Confirmar modelos, material, personalização, condições, prazos e frete.
- Substituir mockups ilustrativos por fotos reais quando disponíveis.
- Em `app/layout.tsx`, remover `robots: {index:false, follow:false}` somente após revisão.
- Configurar domínio, URL canônica e imagem de compartilhamento.
- Revisar políticas de privacidade conforme operação final.

## Links de anúncio
`/?ocasiao=empresa`, `/?ocasiao=casamento`, `/?ocasiao=festa`, `/?ocasiao=evento`.
Parâmetros UTM permanecem na URL, mas não são persistidos nem enviados para o chat.

## Imagens
Mockups gerados por IA como exemplos ilustrativos, nunca apresentados como portfólio real ou clientes atendidos.

## Publicação
Importar este repositório na Vercel, framework Next.js, build `npm run build`.

