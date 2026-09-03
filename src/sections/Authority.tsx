import { AnimatedNumber } from '../components/AnimatedNumber'

const stats = [
  { value: 10, prefix: '+', suffix: ' anos', label: 'de mercado' },
  { value: 40, prefix: '+', suffix: ' mil', label: 'pedidos faturados' },
  { value: 15, prefix: '+', suffix: ' milhões', label: 'de unidades personalizadas' },
  { value: 4.9, suffix: ' ★', decimals: 1, label: 'no Google' },
]

export const Authority = () => (
  <section className="authority" id="numeros" aria-label="Números da Hosana Brindes">
    <div className="container authority__grid">
      {stats.map((stat) => (
        <div className="authority__stat" key={stat.label} data-reveal>
          <strong>{stat.label === 'no Google' ? '4,9 \u2605' : <AnimatedNumber {...stat} />}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
)
