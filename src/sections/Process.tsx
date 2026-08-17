const steps = [
  ['01', 'Escolha o produto', 'Defina o item mais adequado para a sua ação.'],
  ['02', 'Envie sua ideia ou logo', 'Compartilhe a identidade e o contexto do pedido.'],
  ['03', 'Receba o orçamento', 'Quantidade, acabamento e envio entram na proposta.'],
  ['04', 'Aprove a personalização', 'Valide a aplicação antes de produzir.'],
  ['05', 'Produção', 'Seu pedido entra na agenda da fábrica.'],
  ['06', 'Envio', 'Despachamos para o destino combinado.'],
]

export const Process = () => (
  <section className="section process" id="processo">
    <div className="container process__heading" data-reveal>
      <div>
        <p className="eyebrow">Simples e acompanhado</p>
        <h2 className="section-title">Do briefing à entrega.</h2>
      </div>
      <p className="process__deadline"><strong>12 a 15 dias úteis</strong><span>para produção após a confirmação do pagamento, mais o período de transporte.</span></p>
    </div>
    <ol className="container process__steps">
      {steps.map(([number, title, text]) => (
        <li key={number} data-reveal>
          <span>{number}</span>
          <div><h3>{title}</h3><p>{text}</p></div>
        </li>
      ))}
    </ol>
  </section>
)
