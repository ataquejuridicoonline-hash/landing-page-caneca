"use client";
import {useEffect, useRef, useState} from "react";
import {siteConfig} from "../lib/config";

const occasions = [
 {id:"empresa",label:"Empresas",icon:"✦",color:"teal",title:"Sua marca no café de todo dia.",desc:"Para clientes, equipes e ações que merecem ser lembradas.",tag:"BRINDES CORPORATIVOS",image:0},
 {id:"casamento",label:"Casamentos",icon:"♡",color:"cream",title:"Uma lembrança para ficar.",desc:"A identidade do grande dia em um presente cheio de significado.",tag:"CASAMENTOS & CELEBRAÇÕES",image:1},
 {id:"festa",label:"Festas",icon:"✿",color:"peach",title:"O evento acaba. A lembrança fica.",desc:"Cores, temas e ideias para comemorar com todo mundo.",tag:"FESTAS & ANIVERSÁRIOS",image:2},
 {id:"evento",label:"Eventos e turmas",icon:"↗",color:"mint",title:"Um grupo. Muitas histórias.",desc:"Para encontros, formaturas e momentos de fazer parte.",tag:"EVENTOS & FORMATURAS",image:3}
];
type EventData = Record<string,string|number>;
function track(name:string,data:EventData={}) {
 // Consent-aware integration point: listeners may forward only non-personal data.
 window.dispatchEvent(new CustomEvent("finasub:event",{detail:{name,...data}}));
}
function Arrow(){return <span aria-hidden="true">↗</span>}
function Photo({image=0,className="",label}:{image?:number;className?:string;label:string}){return <div role="img" aria-label={label} className={"product-photo photo-"+image+" "+className}/>}

function ContactCTA({children,className="button",position}:{children:React.ReactNode;className?:string;position:string}){
 const destination=siteConfig.chatUrl || "#orcamento";
 return <a className={className} href={destination} target={siteConfig.chatUrl?"_blank":undefined} rel={siteConfig.chatUrl?"noopener noreferrer":undefined} onClick={()=>{track("cta_click",{position});if(siteConfig.chatUrl)track("chat_click",{position})}}>{children} <Arrow/></a>;
}

export default function Home(){
 const [category,setCategory]=useState("todos");
 const [occasion,setOccasion]=useState("empresa");
 const [quantity,setQuantity]=useState("10");
 const [place,setPlace]=useState("");
 const [date,setDate]=useState("");
 const [reference,setReference]=useState("");
 const [summary,setSummary]=useState("");
 const [copied,setCopied]=useState(false);
 const [error,setError]=useState("");
 const [privacy,setPrivacy]=useState(false);
 const started=useRef(false);
 useEffect(()=>{
  const p=new URLSearchParams(window.location.search);
  const selected=p.get("ocasiao");
  if(selected && occasions.some(o=>o.id===selected)){setOccasion(selected);setCategory(selected)}
  track("page_view");
  const depths=new Set<number>();
  const onScroll=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;if(h<=0)return;const d=window.scrollY/h*100;[25,50,75,90].forEach(v=>{if(d>=v&&!depths.has(v)){depths.add(v);track("scroll_depth",{percent:v})}})};
  window.addEventListener("scroll",onScroll,{passive:true});return ()=>window.removeEventListener("scroll",onScroll);
 },[]);
 function pick(id:string){setCategory(id);if(id!=="todos")setOccasion(id);track("select_occasion",{occasion:id})}
 function selectReference(id:string,title:string){setOccasion(id);setReference(title);track("select_example",{occasion:id});document.getElementById("orcamento")?.scrollIntoView({behavior:"smooth"})}
 function begin(){if(!started.current){started.current=true;track("form_start")}}
 function createSummary(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError("");setCopied(false);
  const n=Number(quantity);
  if(!Number.isInteger(n)||n<siteConfig.minimumQuantity){setError("O pedido mínimo é de "+siteConfig.minimumQuantity+" unidades.");return}
  if(!place.trim()){setError("Informe sua cidade e estado para montar o resumo.");return}
  const formattedDate=date?new Date(date+"T12:00:00").toLocaleDateString("pt-BR"):"Ainda não defini";
  const text=["Olá! Gostaria de um orçamento de canecas personalizadas.","Ocasião: "+(occasions.find(o=>o.id===occasion)?.label||"Outro"),"Quantidade: "+n+" unidades","Entrega: "+place.trim(),"Data desejada: "+formattedDate,reference?"Inspiração: "+reference:""].filter(Boolean).join("\n");
  setSummary(text);track("qualification_complete",{quantity:n,occasion});
  setTimeout(()=>document.getElementById("resumo")?.scrollIntoView({behavior:"smooth",block:"center"}),50);
 }
 async function copy(){try{await navigator.clipboard.writeText(summary);setCopied(true)}catch{setError("Selecione e copie o texto do resumo abaixo.")}}
 const today=new Date().toLocaleDateString("en-CA");
 return <>
 <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
 <div className="announcement"><span>FEITO PARA COMPARTILHAR</span><span>Personalizados a partir de <strong>10 unidades</strong> <Arrow/></span></div>
 <header className="header"><a href="#" className="brand" aria-label="FinaSub início"><img className="brand-image" src="/finasub-logo.png" alt="FinaSub" width={99} height={78}/></a><nav aria-label="Navegação principal"><a href="#inspiracoes">Inspirações</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav><ContactCTA className="button button-small" position="header">Pedir orçamento</ContactCTA></header>
 <main id="conteudo">
 <section className="hero section-width">
  <div className="hero-copy"><div className="eyebrow"><span className="dot"/> CANECAS PERSONALIZADAS NO ATACADO</div><div className="hero-minimum">PEDIDOS A PARTIR DE 10 UNIDADES</div><h1>Canecas personalizadas<br/><em>para empresas,<br/>festas e eventos.</em></h1><p>Sua logo, sua arte ou o tema da sua comemoração em um presente para clientes, equipes e convidados.</p><div className="hero-actions"><ContactCTA position="hero">Solicitar orçamento</ContactCTA><span className="hero-note">Preço conforme quantidade<br/>e personalização.</span></div><a className="text-link" href="#inspiracoes">Ver ideias para meu pedido <span>↓</span></a></div>
  <div className="hero-visual"><div className="hero-image-wrap"><Photo image={3} label="Mockup ilustrativo de canecas personalizadas em conjunto, em cenário verde suave" className="hero-photo"/><div className="photo-top"><span>coleção de ideias / 01</span><span>✦</span></div><div className="photo-bottom"><span>Uma ideia.<br/><strong>Muitas possibilidades.</strong></span><a href="#inspiracoes" aria-label="Explorar inspirações">↗</a></div></div><div className="quantity-sticker"><strong>10<span>+</span></strong><span>unidades para<br/>começar sua ideia</span></div><span className="image-caption">Mockups ilustrativos de personalização.</span></div>
 </section>
 <div className="benefit-strip"><div><span>✦</span> Sua marca ou sua arte</div><div><span>↗</span> Empresas, festas e eventos</div><div><span>◎</span> Pedidos em quantidade</div><div><span>♡</span> Uma lembrança útil de verdade</div></div>
 <section id="inspiracoes" className="inspirations section-width">
  <div className="section-heading"><div><span className="eyebrow">SEU PRÓXIMO PEDIDO COMEÇA COM UMA IDEIA</span><h2>Qual é a sua ocasião<span>?</span></h2></div><p>Escolha seu momento.<br/>A gente começa por ele.</p></div>
  <div className="occasion-picker" aria-label="Filtrar inspirações"><button onClick={()=>pick("todos")} aria-pressed={category==="todos"} className={category==="todos"?"selected":""}><span className="story-circle all">✳</span><span>Todas as ideias</span></button>{occasions.map(o=><button key={o.id} onClick={()=>pick(o.id)} aria-pressed={category===o.id} className={category===o.id?"selected":""}><span className={"story-circle "+o.color}><Photo image={o.image} label={o.label}/></span><span>{o.label}</span></button>)}</div>
  <div className="feed" aria-live="polite">{occasions.filter(o=>category==="todos"||category===o.id).map(o=><article className="feed-card" key={o.id}><div className="card-profile"><span className={"avatar "+o.color}>{o.icon}</span><div><strong>Inspirações FinaSub</strong><small>{o.tag}</small></div></div><div className="card-photo-wrap"><Photo image={o.image} label={"Mockup ilustrativo: "+o.title}/><span className="mockup-label">Inspiração ilustrativa</span></div><div className="card-content"><div className="card-meta"><span>{o.icon} IDEIA PARA SEU PEDIDO</span><span>10+ un.</span></div><h3>{o.title}</h3><p>{o.desc}</p><button onClick={()=>selectReference(o.id,o.title)}>Quero nesse estilo <Arrow/></button></div></article>)}</div>
  <p className="gallery-note">As imagens são referências visuais. Modelo, arte, acabamento e disponibilidade serão alinhados no orçamento.</p>
 </section>
 <section className="editorial section-width"><div className="editorial-image"><Photo image={3} label="Referência ilustrativa de canecas personalizadas para uma equipe"/><span className="editorial-label">SUA IDENTIDADE EM CADA CANECA</span></div><div className="editorial-copy"><span className="eyebrow">PERSONALIZAÇÃO PARA A SUA OCASIÃO</span><h2>O presente é útil.<br/><em>A identidade é sua.</em></h2><p>De uma ação com clientes à lembrança de uma festa: comece pela ideia que você quer colocar nas canecas.</p><ul><li><span>01</span><div><strong>Logo e identidade da empresa</strong><p>Para presentear clientes, colaboradores e parceiros.</p></div></li><li><span>02</span><div><strong>Arte e tema do evento</strong><p>Para casamentos, aniversários, encontros e formaturas.</p></div></li><li><span>03</span><div><strong>Detalhes que precisam combinar</strong><p>Modelo, área de impressão, nomes diferentes e embalagem: consulte as opções e os custos no atendimento.</p></div></li></ul><a href="#orcamento" className="text-link">Montar os detalhes do meu pedido <Arrow/></a></div></section>
 <section id="como-funciona" className="how-section"><div className="section-width"><div className="section-heading"><div><span className="eyebrow">SEM DÚVIDAS NA HORA DE PEDIR</span><h2>Do seu pedido<br/>ao orçamento.</h2></div><p>Um pedido personalizado começa<br/>entendendo o que você precisa.</p></div><div className="steps">{[{n:"01",title:"Conte sua ideia",text:"Escolha a ocasião, a quantidade e quando você precisa."},{n:"02",title:"Alinhe os detalhes",text:"Converse sobre modelos, personalização e opções para seu pedido."},{n:"03",title:"Confirme a proposta",text:"Confira valores, arte, frete e prazos antes de fechar."},{n:"04",title:"Combine a entrega",text:"Produção e envio seguem as condições acertadas no atendimento."}].map(s=><div className="step" key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></div></section>
 <section id="orcamento" className="quote-section section-width"><div className="quote-copy"><span className="eyebrow">VAMOS TIRAR SUA IDEIA DO PAPEL?</span><h2>Conte sua ideia.<br/><em>Defina seu pedido.</em></h2><p>Escolha a quantidade e conte a ocasião. Com essas informações, o atendimento pode avaliar as opções para você.</p><div className="quote-transparency"><strong>O que define o valor?</strong><p>Modelo da caneca, quantidade, personalização, embalagem e frete. O preço final e os prazos são confirmados na proposta.</p></div><div className="minimum-card"><span>✳</span><div><strong>A partir de 10 unidades</strong><p>Personalização pensada para pedidos em quantidade.</p></div></div><div className="date-note"><span>↗</span><p><strong>Seu evento já tem data?</strong><br/>Informe para verificarmos a viabilidade de produção e entrega.</p></div></div>
 <div className="quote-panel"><div className="form-heading"><span className="form-step">01 / SEU PEDIDO</span><span>Sem cadastro. Sem complicação.</span></div><h3>Monte seu pedido em poucos passos.</h3>{siteConfig.chatUrl&&<div className="direct-contact"><p>Prefere conversar primeiro?</p><ContactCTA className="text-link" position="form_direct">Falar com o atendimento</ContactCTA><span>Você pode pedir orçamento sem preencher este formulário.</span></div>}<form onSubmit={createSummary} onFocus={begin}>
 <label htmlFor="occasion">Qual é a ocasião?</label><select id="occasion" value={occasion} onChange={e=>{setOccasion(e.target.value);setSummary("")}}>{occasions.map(o=><option key={o.id} value={o.id}>{o.label}</option>)}<option value="outro">Outra ocasião</option></select>
 <label htmlFor="quantity">Quantas canecas você precisa?</label><div className="quantity-row">{[10,30,50,100].map(n=><button type="button" key={n} className={quantity===String(n)?"active":""} onClick={()=>{setQuantity(String(n));setSummary("")}}>{n} un.</button>)}</div><div className="input-unit"><input id="quantity" type="number" min={siteConfig.minimumQuantity} step={1} required value={quantity} onChange={e=>{setQuantity(e.target.value);setSummary("")}}/><span>unidades</span></div><small className="field-help">Outra quantidade? Digite acima. Mínimo de 10 unidades.</small>
 <div className="form-grid"><div><label htmlFor="place">Cidade / UF</label><input id="place" required maxLength={100} placeholder="Ex.: Curitiba / PR" autoComplete="address-level2" value={place} onChange={e=>{setPlace(e.target.value);setSummary("")}}/></div><div><label htmlFor="date">Data desejada <span>(opcional)</span></label><input id="date" type="date" min={today} value={date} onChange={e=>{setDate(e.target.value);setSummary("")}}/></div></div>
 {reference&&<div className="chosen-reference"><span>Inspiração: {reference}</span><button type="button" aria-label="Remover inspiração" onClick={()=>{setReference("");setSummary("")}}>×</button></div>}
 <button className="button form-submit" type="submit">Montar resumo do pedido <Arrow/></button><p className="form-footnote">O formulário monta um resumo. O envio acontece pelo atendimento.</p>{error&&<p className="form-error" role="alert">{error}</p>}</form>
 {summary&&<div id="resumo" className="summary" role="status"><span className="eyebrow">02 / RESUMO DO PEDIDO</span><h4>Confira os detalhes do seu pedido.</h4><pre>{summary}</pre><button type="button" className="button" onClick={copy}>{copied?"Resumo copiado ✓":"Copiar resumo"} <Arrow/></button>{siteConfig.chatUrl?<a className="button chat-button" href={siteConfig.chatUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track("chat_click",{occasion,quantity:Number(quantity)})}>Conversar sobre meu pedido <Arrow/></a>:<p className="chat-pending"><strong>Seu resumo está pronto para copiar.</strong> Ele ainda não foi enviado. O link do atendimento será disponibilizado aqui.</p>}</div>}
 </div></section>
 <section id="duvidas" className="faq-section section-width"><div><span className="eyebrow">ANTES DO PRIMEIRO OI</span><h2>Ficou alguma<br/><em>dúvida?</em></h2><p>O essencial para planejar seu pedido.</p></div><div className="faqs">{[
 ["Qual é o pedido mínimo?","Os pedidos começam em 10 unidades. Trabalhamos com personalização em quantidade para empresas, festas e eventos."],
 ["Posso usar a logo da minha empresa?","Sim, essa é uma das propostas de personalização. A aplicação e a viabilidade do arquivo são alinhadas no atendimento."],
 ["Vocês atendem festas e formaturas?","A proposta atende empresas, festas, casamentos, formaturas e eventos. Conte a ocasião para conversarmos sobre as opções."],
 ["Preciso ter a arte pronta?","Você pode começar com uma ideia ou uma referência. Desenvolvimento de arte, ajustes e eventuais custos serão esclarecidos na proposta."],
 ["Pode ter um nome diferente em cada caneca?","Informe essa necessidade no pedido. A possibilidade e o valor dependem do modelo, da arte e da quantidade."],
 ["Qual é o preço e o prazo de entrega?","O orçamento considera modelo, quantidade, personalização e destino. Valores, frete e prazos precisam ser confirmados antes de fechar o pedido."],
 ["Preencher o formulário já envia meu pedido?","Não. O formulário prepara um resumo para você conferir e copiar. O envio é feito no canal de atendimento; o pedido só é fechado depois de combinar a proposta."]
 ].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
 <section className="closing section-width"><span className="eyebrow">UMA IDEIA SUA. UMA LEMBRANÇA DE TODOS.</span><h2>Uma ideia sua.<br/><em>Um presente para todos.</em></h2><ContactCTA className="button button-light" position="closing">Solicitar orçamento</ContactCTA><p>Canecas personalizadas • A partir de 10 unidades</p></section>
 </main>
 <footer className="section-width"><a className="brand" href="#"><img className="brand-image" src="/finasub-logo.png" alt="FinaSub" width={99} height={78}/></a><p>Ideias que viram lembranças.</p><button onClick={()=>setPrivacy(true)}>Privacidade</button><small>© {new Date().getFullYear()} FinaSub</small></footer>
 <div className="mobile-bar"><span>Personalizados<br/><strong>A partir de 10 unidades</strong></span><ContactCTA className="button button-small" position="mobile_bar">Pedir orçamento</ContactCTA></div>
 {privacy&&<div className="modal-backdrop" onClick={()=>setPrivacy(false)}><dialog open className="privacy-modal" aria-label="Privacidade" onClick={e=>e.stopPropagation()}><button className="modal-close" aria-label="Fechar privacidade" onClick={()=>setPrivacy(false)}>×</button><h2>Privacidade</h2><p>Este site usa os dados preenchidos somente no seu navegador para montar o resumo do pedido. O formulário não envia nem armazena esses dados em um servidor.</p><p>Ao copiar o resumo e enviá-lo por um canal de atendimento, os dados serão compartilhados por sua iniciativa. Links externos seguem as políticas dos respectivos serviços.</p><p>Esta versão não carrega Meta Pixel, Clarity ou cookies de publicidade. A hospedagem pode tratar registros técnicos necessários para operar o site.</p><button className="button" onClick={()=>setPrivacy(false)}>Entendi</button></dialog></div>}
 </>;
}

