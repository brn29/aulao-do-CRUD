import express, { Router } from "express";
import "dotenv/config";

interface Anime {
    id?: number;
    title: string;
    autorName: string;
}

const port = process.env.PORT;

const app = express();
app.use(express.json());

const router = Router();

const database: Anime[] = [];

database.push({
    id: database.length,
    title: "Baka to Test",
    autorName: "Yuu"
});

//Rota para criar um Anime
router.post("/", (req, res) => {
    const anime = req.body as Anime;
    anime.id = database.length;
    database.push(anime);
    const animeCreated = database[database.length - 1];

    return res.json(animeCreated);
})

// Rota para buscar todos os Animes
router.get("/", (req, res) => {
    return res.json(database);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params["id"]);
    const animeRequest = req.body as Anime;
    const anime = database.find(anime => anime.id === id);
    if (!anime) {
        return res.json({message: "Anime não encontrado!"})
    }
    anime.title = animeRequest.title ?? anime.title;
    anime.autorName = animeRequest.autorName ?? anime.autorName;

    database[id] = anime;
    return res.json(database[id]);
})

router.delete("/:id",(req, res, next)=> {
    const id = parseInt(req.params["id"]);
    const anime = database.find(animes => animes.id ===  id);
    if (!anime) {
        return res.json({message: "Anime não encontrado!"})
    }
    next();
} , (req, res) => {
    const id = parseInt(req.params["id"]);
    
    const deleted = database.splice(id, 1);

    return res.json(deleted[0]);
});

const nu = null;
const value = "Tem valor";
console.log(nu ?? value)

app.use(router);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
});