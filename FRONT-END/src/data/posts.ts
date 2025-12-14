// src/data/posts.ts

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "marmore-ou-granito",
    title: "Mármore ou Granito: Qual escolher para a cozinha?",
    excerpt: "Descubra as principais diferenças de durabilidade e resistência para não errar na hora de reformar sua bancada.",
    content: "O mármore é uma rocha metamórfica, famosa pelos seus veios únicos e elegância. Porém, é mais poroso e mancha fácil, sendo ideal para banheiros e áreas de baixo tráfego. Já o granito é uma rocha ígnea, extremamente dura e resistente a riscos e calor, o que o torna a escolha perfeita para cozinhas e áreas gourmet.",
    date: "12 Dez 2023",
    author: "Ana Silva",
    image: "/Marmore1.jpeg", // Certifique-se que esta imagem existe na pasta public
    category: "Dicas",
  },
  {
    id: 2,
    slug: "cuidados-bancada",
    title: "5 Cuidados essenciais com sua bancada de pedra",
    excerpt: "Aprenda como limpar e manter o brilho da sua pedra natural por muito mais tempo com produtos simples.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae purus pulvinar, bibendum nibh id, molestie ex. Fusce quis erat vestibulum ipsum volutpat mollis. Proin finibus imperdiet tortor non finibus. Pellentesque vestibulum lectus quis nisl luctus molestie. Morbi suscipit est nec mauris luctus bibendum in vitae diam. In mauris arcu, varius quis pulvinar eu, aliquet in augue. Nulla facilisi. Donec dolor massa, mattis ut tincidunt et, venenatis in felis. Etiam a nulla lacinia, hendrerit diam sollicitudin, egestas ligula. Curabitur consequat, nunc ac vestibulum cursus, leo diam euismod arcu, non efficitur enim nisi eu urna. Morbi vitae nisl nec nibh bibendum rhoncus eget vel tellus. Donec augue purus, sodales a nunc vel, lobortis porta arcu. Integer sit amet dui lobortis, auctor est quis, vulputate nisi. Sed tincidunt ut ex id mollis. Quisque leo dui, porta nec ipsum in, condimentum fermentum augue. Proin dictum vulputate congue. Curabitur augue erat, feugiat ut odio vel, dictum tincidunt nulla. Aliquam erat volutpat. Donec porta, justo imperdiet consectetur aliquam, tellus nunc molestie magna, vel volutpat sapien elit sit amet urna. Aenean gravida mauris est, eu tincidunt dui efficitur euismod. Vivamus tristique lorem at consequat faucibus. Maecenas accumsan massa quis fermentum scelerisque. Aenean auctor id enim at tincidunt. Etiam vel velit lorem. Nam interdum, elit vel molestie vehicula, sem leo faucibus tortor, quis commodo erat dolor eget dui. Aliquam id enim placerat, dapibus nisl vel, porttitor felis. Donec vitae tellus et urna consequat lobortis et in nunc. Etiam et ligula non nisl euismod accumsan at ut lectus. Nulla sed massa ullamcorper, lacinia turpis at, laoreet sem. Praesent blandit, purus faucibus hendrerit placerat, odio dolor facilisis enim, id porttitor dolor urna in nulla. Nunc quam sapien, convallis quis ipsum in, ornare aliquet ipsum. Ut efficitur consequat libero nec maximus. Sed eget maximus odio, at vestibulum odio. Aenean pulvinar sit amet nulla sit amet aliquet. Duis euismod pellentesque sollicitudin. Quisque aliquet urna non porttitor vestibulum. Pellentesque nisi dolor, ornare vel nunc ut, congue pretium risus. Suspendisse facilisis nibh et porttitor dictum. Maecenas pretium nibh magna, sit amet dictum diam euismod et. Vestibulum ullamcorper rutrum ligula ut tempus. Donec viverra, lorem non auctor ultricies, quam orci auctor magna, quis ullamcorper augue metus nec purus. Cras imperdiet aliquet fermentum. In egestas ornare est vel lacinia. Fusce turpis elit, elementum a elementum a, imperdiet quis odio. Nullam eros nisi, facilisis vel est vitae, suscipit interdum enim. Nullam eros nisl, iaculis sed turpis in, ornare pretium arcu. Integer bibendum elit vitae libero fringilla sagittis. Fusce aliquam tristique arcu, vitae cursus elit efficitur maximus. Suspendisse potenti. Pellentesque pulvinar, tortor eu maximus imperdiet, nunc ipsum tempus nisl, eu tincidunt justo ex id justo. Quisque luctus sapien vitae odio sagittis venenatis. Nulla vitae lacus bibendum, aliquet erat sed, blandit lacus. Phasellus gravida dapibus nunc a imperdiet. Vestibulum in elementum tellus, interdum lobortis orci. Aenean sodales augue in aliquam rhoncus. Nulla consequat ante lectus. Maecenas lectus odio, aliquam dapibus massa vitae, commodo fermentum risus. Donec urna purus, eleifend sit amet sagittis eget, aliquet feugiat nunc. Donec sed nunc at nunc convallis pharetra. Etiam congue tempus lobortis. Morbi finibus tempor risus. Phasellus congue maximus sem et mollis. Integer at pellentesque lectus, sit amet aliquam ante. Morbi eget scelerisque ante, non laoreet arcu. Donec nec libero libero. Vivamus tellus magna, vestibulum ut pulvinar sed, commodo a nunc. Duis ultrices cursus quam, non aliquet felis consequat eget. Aenean vitae auctor nulla, vitae volutpat lectus. Fusce nibh nibh, faucibus vel ex a, posuere scelerisque eros. Integer libero libero, varius facilisis feugiat vitae, sagittis in mi. Donec pellentesque purus quam, vel tempor eros blandit sed. Quisque auctor dapibus massa tristique sollicitudin. Nam vel tristique elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin in tempor diam, id maximus urna.",
    date: "10 Dez 2023",
    author: "Carlos Souza",
    image: "/Marmore1.jpeg",
    category: "Manutenção",
  },
  {
    id: 3,
    slug: "tendencias-2024",
    title: "Tendências de decoração com pedras naturais",
    excerpt: "Veja o que está em alta na arquitetura de luxo e como aplicar pedras exóticas no seu projeto.",
    content: "Para 2024, a tendência são as pedras exóticas com veios marcantes e cores vibrantes. O quartzito, por exemplo, ganha destaque por unir a beleza do mármore com a resistência do granito. Bancadas com acabamento escovado (fosco) também estão super em alta.",
    date: "05 Dez 2023",
    author: "Beatriz Lima",
    image: "/Marmore1.jpeg",
    category: "Decoração",
  },
];