
const mongoose = require('mongoose');
const uri = "mongodb+srv://tonyDev:antonio1358@cluster0.zsmnsv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(uri, {
}).then(() => {
    console.log('MongoDB Atlas conectado com sucesso!');
}).catch((err) => {
    console.error('Erro ao conectar no MongoDB Atlas:', err);
});

const usuariosSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
});
const Usuario = mongoose.model('usuarios', usuariosSchema);
async function salvarUsuario(){
  const usuarioExistente = await Usuario.findOne({ email: 'admin' });
  if (usuarioExistente) {
    console.log('Usuário já existe no banco de dados.');
    return;}
  const novoUsuario = new Usuario({
    nome: 'Tony',
    email: 'admin',
    senha: '1234'
  });
  await novoUsuario.save();
  console.log('Novo usuário salvo com sucesso!');

  }

const noticiaSchema = new mongoose.Schema({
    titulo: String,
    img: String,
    categoria: String,
    conteudo: String,
    slug: String,
    autor: String,
    views: Number
})
const noticia = mongoose.model('noticia', noticiaSchema);
async function salvarNoticia(){
    const novaNoticia = [
        {
          titulo: 'Héctor Hernández brilha na estreia de Dorival no Corinthians',
          img: '/br1.png',
          categoria: 'Futebol Brasileiro',
          conteudo: 'O atacante espanhol Héctor Hernández marcou o gol da vitória do Corinthians sobre o Novorizontino na estreia de Dorival Júnior como técnico do clube, pela Copa do Brasil.',
          slug: 'hector-hernandez-corinthians',
          autor: 'Redação',
          views: 0
        },
        {
          titulo: 'Ancelotti recusa proposta da CBF para treinar a Seleção Brasileira',
          img: '/br1.png',
          categoria: 'Futebol Internacional',
          conteudo: 'Carlo Ancelotti decidiu permanecer no Real Madrid e recusou a oferta da CBF para assumir o comando da Seleção Brasileira, alegando compromissos com o clube espanhol.',
          slug: 'ancelotti-recusa-cbf',
          autor: 'Redação',
          views: 0
        },
        {
          titulo: 'São Paulo conquista Supercopa do Brasil Feminina',
          img: '/br1.png',
          categoria: 'Futebol Feminino',
          conteudo: 'O São Paulo venceu o Sport por 4 a 0 na estreia da Supercopa do Brasil Feminina, com gols de Giovanna Crivelari, Bia Menezes, Karla Alves e Bruna Calderan.',
          slug: 'sao-paulo-supercopa-feminina',
          autor: 'Redação',
          views: 0
        },
        {
          titulo: 'Flamengo vence Palmeiras e conquista bicampeonato da Libertadores Sub-20',
          img: '/br1.png',
          categoria: 'Futebol de Base',
          conteudo: 'O Flamengo derrotou o Palmeiras nos pênaltis e conquistou o bicampeonato da Libertadores Sub-20, com destaque para o goleiro Lucas Furtado.',
          slug: 'flamengo-bicampeao-sub20',
          autor: 'Redação',
          views: 0
        },
        {
          titulo: 'Internacional vence Grêmio e conquista o Campeonato Gaúcho após nove anos',
          img: '/br1.png',
          categoria: 'Futebol Brasileiro',
          conteudo: 'Com gol de Valencia, o Internacional venceu o Grêmio e quebrou um jejum de nove anos sem conquistar o Campeonato Gaúcho.',
          slug: 'internacional-campeao-gaucho',
          autor: 'Redação',
          views: 0
        }
      ];
      
    for (i=0;i < novaNoticia.length; i++){
        await noticia.findOneAndUpdate(
            {slug:novaNoticia[i].slug},
            novaNoticia[i],
            {upsert: true, new: true}
        )
    }
}
salvarUsuario();
salvarNoticia();
module.exports = {Usuario, noticia};

