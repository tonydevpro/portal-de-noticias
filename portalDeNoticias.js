const express =require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = require('./upload');
const { Usuario, noticia: postes } = require('./postes');


// leitura do arquivo JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
// sessao
app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true}));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use('/publica', express.static(path.join(__dirname, 'publica')));
app.set('views', path.join(__dirname, '/paginas'))

//const USER = {
//    username: 'admin',
//   password: '1234'
//}; 


// pagina de login
app.get('/login', (req, res)=>{
    // Verifica se o usuário já está logado
    if (req.session.user) {
        return res.redirect('/painelADM');
    }
    res.render('login', { error: null });
});
// processamento do login
app.post('/login', async (req, res)=>{
    const { username, password } = req.body;
    const user = await Usuario.findOne({ email: username, senha: password });
    // Verifica se o usuário existe e se a senha está correta
    if (user) {
        req.session.user = user;
        // Se o login for bem-sucedido, redireciona para a página do painel
        res.redirect('/painelADM');
    }
    else {
        // Se o login falhar, redireciona de volta para a página de login com uma mensagem de erro
        res.render('login', { error: 'Usuário ou senha inválidos' });
    }
});
// painel do admin
app.get('/painelADM', async (req, res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try{
        const noticias = await postes.find({}).sort({ _id: -1 });
        res.render('painelADM', { user: req.session.user, noticias });
    }
    catch(err){
        console.error('erro ao buscar postagens:', err);
        res.status(500).send('erro no servidor');
    }
    console.log(req.session.user);
    
});
// logout
app.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.send('Erro ao fazer logout');           
        }
        res.redirect('/login');
    });
});
// deletar noticia
app.get('/deletarNoticia/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        await postes.findByIdAndDelete(id);
        res.redirect('/painelADM');
    }catch(err){
        console.error('erro ao deletar noticia:', err);
        res.status(500).send('erro no servidor');
    }
});
// editar noticia
app.get('/editarNoticias/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const noticia = await postes.findById(id);
        if (!noticia) {
            return res.status(404).send('noticia nao encontrada');
        }
        res.render('editarNoticias', { noticia });
    }catch(err){
        console.error('erro ao buscar noticia:', err);
        res.status(500).send('erro no servidor');
    }
});
app.post('/editarNoticias/:id', upload.single('img'), async (req, res)=>{
    const { id } = req.params;
    const { titulo, categoria, conteudo, slug, autor } = req.body;
    const img = req.file ? req.file.filename : undefined; // Verifica se a imagem foi enviada

    try {
        const atualizacao = {
            titulo,
            categoria,
            conteudo,
            slug,
            autor
        };
        if (img) {
            atualizacao.img = img; // Atualiza a imagem apenas se uma nova imagem foi enviada
        }
        // excluir imagem antiga se uma nova imagem for enviada
        const noticiaAntiga = await postes.findById(id);
        if (noticiaAntiga && img) {
            const fs = require('fs');
            const caminhoImagemAntiga = path.join(__dirname, 'publica', 'img', noticiaAntiga.img);
            fs.unlink(caminhoImagemAntiga, (err) => {
                if (err) {
                    console.error('Erro ao excluir imagem antiga:', err);
                }
            });
        }
        // Atualiza a postagem no banco de dados
        await postes.findByIdAndUpdate(id, atualizacao);
        res.redirect('/painelADM');
    } catch (err) {
        console.error('erro ao editar noticia:', err);
        res.status(500).send('erro no servidor');
    }
});

// pagina de cadastro
app.get('/registre', (req, res)=>{
    res.render('registre');
})
app.post('/registre', async (req, res)=>{
    const { nome, username, password, confirmarSenha } = req.body;

    // adicionar a lógica para verificar se o usuário já existe e se as senhas coincidem
    if (password !== confirmarSenha) {
        return res.status(400).send('As senhas não coincidem');
    }
    // Verificar se o usuário já existe (exemplo simples, você deve usar um banco de dados real)
    const existe = await Usuario.findOne({ $or: [{ email: username }, { nome }] });

    if (existe) {
        return res.status(400).send('Usuário já existe');
    }

    await Usuario.create({ nome, email: username, senha: password });
    res.redirect('/login');
});

app.post('/cadastrarNoticia', upload.single ('img'), async (req, res)=>{
    const { titulo, categoria, conteudo, slug, autor } = req.body;
    const views = 0;
    const img = req.file.filename;
    

    // Verifica se o slug já existe
    const slugExistente = await postes.findOne({ slug });
    if (slugExistente) {
        return res.status(400).send('Slug já existe');
    }
    // Cria uma nova postagem
    const novaPostagem = new postes({
        titulo,
        img,
        categoria,
        conteudo,
        slug,
        autor,
        views
    });
    await novaPostagem.save();
    res.redirect('/painelADM');
    console.log(novaPostagem);
    ;
}
);


app.get('/', async (req,res)=>{

    if(req.query.busca == null){
        try{
            const todosPostes = await postes.find({}).sort({_id:-1});
            const ordemNoticias = await postes.find({}).sort({ views: -1 });
            console.log(todosPostes);
            res.render('inicio', {noticias: todosPostes, ordemNoticias});
        } catch (err){
            console.error('erro ao buscar postagens:', err);
            res.status(500).send('erro no servidor');
        }
    }else{
        return
    }
});


app.get('/busca', async (req, res) => {
    const procurar = req.query.busca;

    if (!procurar) {
        return res.redirect('/');
    }

    try {
        const resultados = await postes.find({
            $or: [
                { titulo: { $regex: procurar, $options: 'i' } },
                { subtitulo: { $regex: procurar, $options: 'i' } }
            ]
        }).collation({ locale: 'pt', strength: 1 }) // Ignora acentos e case
        // .sort({ _id: -1 });

        const ordemNoticias = await postes.find({}).sort({ views: -1 });

        res.render('resultados', { procurar, resultados, ordemNoticias });

    } catch (err) {
        console.error('Erro ao buscar:', err);
        res.status(500).send('Erro no servidor durante a busca');
    }
});


app.get('/:slug',async (req,res)=>{
    try{
        const noticia = await postes.findOneAndUpdate({slug: req.params.slug}, {$inc: {views: 1}},{new:true})
        const ordemNoticias = await postes.find({}).sort({ views: -1 });
        // Buscar todos os posts para mostrar na lateral, por exemplo
        const todosPostes = await postes.find({}).sort({ _id: -1 });
        if (!noticia){
            return res.status(404).send('noticia nao encontrada')
        }
        res.render('sigla',{noticia, ordemNoticias});
    }catch(err){
        console.error('erro ao buscar noticia:', err);
        res.status(500).send('erro no servidor')
    }
    
});

app.listen(5000, ()=>{
    console.log('servidor rodando')
}); 