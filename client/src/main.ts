import './styles/main.scss';

// Tipos
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
  disponivel: boolean;
}

// Carousel
class Carousel {
  private slides: NodeListOf<Element>;
  private currentSlide: number = 0;
  private interval: number | null = null;

  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.init();
  }

  private init(): void {
    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoPlay();
      this.addEventListeners();
    }
  }

  private showSlide(index: number): void {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.slides[index].classList.add('active');
    this.currentSlide = index;
  }

  private nextSlide(): void {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  private startAutoPlay(): void {
    this.interval = window.setInterval(() => this.nextSlide(), 5000);
  }

  private addEventListeners(): void {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
      });

      carousel.addEventListener('mouseleave', () => {
        if (!this.interval) {
          this.startAutoPlay();
        }
      });
    }
  }
}

// Gerenciamento de Produtos
class ProdutoManager {
  private produtos: Produto[] = [];
  private gridContainer: HTMLElement | null;

  constructor() {
    this.gridContainer = document.querySelector('.produtos-grid');
    this.init();
  }

  private async init(): Promise<void> {
    await this.carregarProdutos();
    this.setupFiltros();
  }

  private async carregarProdutos(): Promise<void> {
    try {
      const response = await fetch('/api/produtos');
      this.produtos = await response.json();
      this.renderizarProdutos();
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      // Produtos de exemplo para desenvolvimento
      this.produtos = [
        // Blusas
        {
          id: '1',
          nome: 'Blusa de Crochê',
          descricao: 'Blusa artesanal feita com fio 100% algodão',
          preco: 89.90,
          imagem: 'https://via.placeholder.com/300x300?text=Blusa',
          categoria: 'blusas',
          disponivel: true
        },
        {
          id: '2',
          nome: 'Blusa Bicolor',
          descricao: 'Blusa em crochê com detalhes em duas cores',
          preco: 99.90,
          imagem: 'https://via.placeholder.com/300x300?text=Blusa+Bicolor',
          categoria: 'blusas',
          disponivel: true
        },
        {
          id: '3',
          nome: 'Blusa Renda',
          descricao: 'Blusa em crochê com detalhes em renda',
          preco: 119.90,
          imagem: 'https://via.placeholder.com/300x300?text=Blusa+Renda',
          categoria: 'blusas',
          disponivel: true
        },
        {
          id: '4',
          nome: 'Blusa Regata',
          descricao: 'Blusa regata em crochê com decote em V',
          preco: 79.90,
          imagem: 'https://via.placeholder.com/300x300?text=Blusa+Regata',
          categoria: 'blusas',
          disponivel: true
        },
        // Biquínis
        {
          id: '5',
          nome: 'Biquíni de Crochê',
          descricao: 'Biquíni artesanal com forro',
          preco: 129.90,
          imagem: 'https://via.placeholder.com/300x300?text=Biquíni',
          categoria: 'biquinis',
          disponivel: true
        },
        {
          id: '6',
          nome: 'Biquíni Fio Dental',
          descricao: 'Biquíni fio dental em crochê com forro',
          preco: 139.90,
          imagem: 'https://via.placeholder.com/300x300?text=Biquíni+Fio+Dental',
          categoria: 'biquinis',
          disponivel: true
        },
        {
          id: '7',
          nome: 'Biquíni Asa Delta',
          descricao: 'Biquíni asa delta em crochê com forro',
          preco: 149.90,
          imagem: 'https://via.placeholder.com/300x300?text=Biquíni+Asa+Delta',
          categoria: 'biquinis',
          disponivel: true
        },
        {
          id: '8',
          nome: 'Biquíni Triângulo',
          descricao: 'Biquíni triângulo em crochê com forro',
          preco: 119.90,
          imagem: 'https://via.placeholder.com/300x300?text=Biquíni+Triângulo',
          categoria: 'biquinis',
          disponivel: true
        },
        // Shorts
        {
          id: '9',
          nome: 'Short de Crochê',
          descricao: 'Short artesanal com elástico na cintura',
          preco: 79.90,
          imagem: 'https://via.placeholder.com/300x300?text=Short',
          categoria: 'shorts',
          disponivel: true
        },
        {
          id: '10',
          nome: 'Short Jeans Crochê',
          descricao: 'Short em crochê com detalhes em jeans',
          preco: 89.90,
          imagem: 'https://via.placeholder.com/300x300?text=Short+Jeans',
          categoria: 'shorts',
          disponivel: true
        },
        {
          id: '11',
          nome: 'Short Renda',
          descricao: 'Short em crochê com detalhes em renda',
          preco: 99.90,
          imagem: 'https://via.placeholder.com/300x300?text=Short+Renda',
          categoria: 'shorts',
          disponivel: true
        },
        {
          id: '12',
          nome: 'Short Bicolor',
          descricao: 'Short em crochê com duas cores',
          preco: 84.90,
          imagem: 'https://via.placeholder.com/300x300?text=Short+Bicolor',
          categoria: 'shorts',
          disponivel: true
        },
        // Saias
        {
          id: '13',
          nome: 'Saia de Crochê',
          descricao: 'Saia midi em crochê com elástico na cintura',
          preco: 109.90,
          imagem: 'https://via.placeholder.com/300x300?text=Saia',
          categoria: 'saias',
          disponivel: true
        },
        {
          id: '14',
          nome: 'Saia Longa',
          descricao: 'Saia longa em crochê com elástico na cintura',
          preco: 129.90,
          imagem: 'https://via.placeholder.com/300x300?text=Saia+Longa',
          categoria: 'saias',
          disponivel: true
        },
        {
          id: '15',
          nome: 'Saia Curta',
          descricao: 'Saia curta em crochê com elástico na cintura',
          preco: 89.90,
          imagem: 'https://via.placeholder.com/300x300?text=Saia+Curta',
          categoria: 'saias',
          disponivel: true
        },
        {
          id: '16',
          nome: 'Saia Renda',
          descricao: 'Saia em crochê com detalhes em renda',
          preco: 119.90,
          imagem: 'https://via.placeholder.com/300x300?text=Saia+Renda',
          categoria: 'saias',
          disponivel: true
        }
      ];
      this.renderizarProdutos();
    }
  }

  private renderizarProdutos(categoria: string = 'todos'): void {
    if (!this.gridContainer) return;

    const produtosFiltrados = categoria === 'todos' 
      ? this.produtos 
      : this.produtos.filter(p => p.categoria === categoria);

    this.gridContainer.innerHTML = produtosFiltrados.map(produto => `
      <div class="produto-card">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <span>R$ ${produto.preco.toFixed(2)}</span>
        <p class="disponibilidade">${produto.disponivel ? 'Disponível' : 'Indisponível'}</p>
        <button class="pedido-btn" ${!produto.disponivel ? 'disabled' : ''}>
          Fazer Pedido
        </button>
      </div>
    `).join('');

    this.setupEventListenersPedido();
  }

  private setupFiltros(): void {
    const botoes = document.querySelectorAll('.categoria-btn');
    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        botoes.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');
        const categoria = botao.getAttribute('data-categoria');
        if (categoria) {
          this.renderizarProdutos(categoria);
        }
      });
    });
  }

  private setupEventListenersPedido(): void {
    const botoes = document.querySelectorAll('.pedido-btn');
    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        // Implementar lógica de pedido
        console.log('Pedido iniciado');
      });
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
  new ProdutoManager();
}); 