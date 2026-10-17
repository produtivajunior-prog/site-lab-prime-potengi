export const SITE = {
  nome: "Laboratório Prime Potengi",
  razao: "D&M Laboratório de Análises Clínicas LTDA",
  cnpj: "10.994.083/0001-35",
  telefone: "(84) 3201-2751",
  whatsapp: "558432012751",
  whatsappUrl:
    "https://wa.me/558432012751?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.",
  instagram: "https://instagram.com/labprimepotengi",
  email: "contato@primepotengi.com.br",
  desde: 2009,
};

export type HeroSlide = {
  id: string;
  /** Linha superior em destaque, geralmente terminando em ponto. */
  title: string;
  /** Linha colorida (acento). */
  subtitle: string;
  /** Bloco de apoio (faixa azul média no rodapé do flyer). */
  support: string;
  ctaLabel: string;
  ctaTo: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "pacotes",
    title: "Pacotes de exames no Prime Potengi",
    subtitle: "Cuidado em todas as fases.",
    support: "Na unidade mais próxima ou pelo Atendimento Móvel.",
    ctaLabel: "Saiba mais",
    ctaTo: "/servicos",
  },
  {
    id: "movel",
    title: "Coleta em casa Prime Potengi",
    subtitle: "Conforto, segurança e agilidade.",
    support: "Agende pelo WhatsApp em poucos minutos.",
    ctaLabel: "Agendar agora",
    ctaTo: "/atendimento-movel",
  },
  {
    id: "retire",
    title: "Seus resultados online, quando quiser.",
    subtitle: "Acesse pelo CPF com segurança.",
    support: "Disponível 24 horas, todos os dias.",
    ctaLabel: "Acessar resultados",
    ctaTo: "/auth",
  },
];

export type Unidade = {
  id: string;
  nome: string;
  endereco: string;
  cep: string;
  cidade: string;
  mapsQuery: string;
};

export const UNIDADES: Unidade[] = [
  {
    id: "candelaria",
    nome: "Candelária / Parque das Colinas",
    endereco: "Rua Prof. Francisco Luciano de Oliveira, 2460, Salas 8 e 9 — Candelária",
    cep: "59066-060",
    cidade: "Natal/RN",
    mapsQuery: "Rua Prof. Francisco Luciano de Oliveira, 2460, Candelária, Natal RN",
  },
  {
    id: "pitimbu",
    nome: "Pitimbu",
    endereco: "Rua das Perdizes, 50, Loja 25 — Pitimbu",
    cep: "59067-480",
    cidade: "Natal/RN",
    mapsQuery: "Rua das Perdizes, 50, Pitimbu, Natal RN",
  },
  {
    id: "boa-esperanca",
    nome: "Boa Esperança — Parnamirim",
    endereco: "Av. Comandante Petit, 967 — Boa Esperança",
    cep: "59140-640",
    cidade: "Parnamirim/RN",
    mapsQuery: "Av. Comandante Petit, 967, Boa Esperança, Parnamirim RN",
  },
  {
    id: "joao-camara",
    nome: "João Câmara",
    endereco: "Rua Jerônimo Câmara, 299",
    cep: "59550-000",
    cidade: "João Câmara/RN",
    mapsQuery: "Rua Jerônimo Câmara, 299, João Câmara RN",
  },
  {
    id: "vale-do-sol",
    nome: "Vale do Sol — Parnamirim",
    endereco: "Av. Dr. Mário Negócio, 1063 — Vale do Sol",
    cep: "",
    cidade: "Parnamirim/RN",
    mapsQuery: "Av. Dr. Mário Negócio, 1063, Vale do Sol, Parnamirim RN",
  },
];

export type Servico = {
  id: string;
  nome: string;
  descricao: string;
  preparo: string;
  documentos?: string;
  preco: number;
};

export const SERVICOS: Servico[] = [
  {
    id: "hemograma",
    nome: "Hemograma Completo",
    descricao: "Avaliação geral das células sanguíneas — essencial para check-ups e diagnósticos.",
    preparo: "Jejum recomendado de 4 horas. Mantenha hidratação com água.",
    documentos: "Documento com foto e pedido médico (quando houver).",
    preco: 35,
  },
  {
    id: "glicemia",
    nome: "Glicemia em Jejum",
    descricao: "Mede o nível de açúcar no sangue. Importante no acompanhamento de diabetes.",
    preparo: "Jejum de 8 horas. Água é permitida. Evite atividade física intensa na véspera.",
    documentos: "Documento com foto e pedido médico (quando houver).",
    preco: 18,
  },
  {
    id: "colesterol",
    nome: "Perfil Lipídico",
    descricao: "Colesterol total, HDL, LDL e triglicerídeos para avaliação cardiovascular.",
    preparo: "Jejum de 12 horas. Evite bebida alcoólica nas 72h anteriores.",
    documentos: "Documento com foto e pedido médico (quando houver).",
    preco: 55,
  },
  {
    id: "tsh",
    nome: "TSH e T4 Livre",
    descricao: "Avaliação da função da tireoide.",
    preparo: "Sem necessidade de jejum. Informe medicamentos em uso.",
    documentos: "Documento com foto e pedido médico (quando houver).",
    preco: 70,
  },
  {
    id: "urina",
    nome: "Urina Tipo 1 (EAS)",
    descricao: "Análise físico-química e microscópica da urina.",
    preparo: "Coletar a primeira urina da manhã, jato médio, em frasco esterilizado fornecido pelo laboratório.",
    documentos: "Documento com foto e pedido médico (quando houver).",
    preco: 22,
  },
  {
    id: "beta-hcg",
    nome: "Beta HCG",
    descricao: "Teste de gravidez sanguíneo com alta precisão.",
    preparo: "Sem necessidade de jejum.",
    documentos: "Documento com foto.",
    preco: 45,
  },
];

export type Parceiro = { nome: string; sigla: string };

export const PARCEIROS: Parceiro[] = [
  { nome: "Hapvida", sigla: "Hap" },
  { nome: "SulAmérica", sigla: "Sul" },
  { nome: "Amil", sigla: "Am" },
  { nome: "Geap", sigla: "Ge" },
];
