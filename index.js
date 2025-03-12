import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Die Zukunft der Blockchain-Technologie",
    content:
      "Die Blockchain-Technologie verändert die Art und Weise, wie wir Daten speichern und übertragen. Durch ihre Dezentralisierung bietet sie Sicherheit und Transparenz, die in Bereichen wie Finanzen, Lieferketten und Gesundheitswesen revolutionär sind. In Zukunft könnten noch mehr Branchen von dieser Technologie profitieren und neue Möglichkeiten für Innovationen schaffen.",
    author: "Lukas Meier",
    date: "2025-03-11T10:00:00Z",
  },
  {
    id: 2,
    title: "Künstliche Intelligenz: Chancen und Herausforderungen",
    content:
      "Künstliche Intelligenz (KI) entwickelt sich rasant und beeinflusst viele Aspekte unseres Lebens – von personalisierten Empfehlungen bis hin zur medizinischen Diagnose. Trotz der vielen Vorteile müssen ethische Fragen, wie Datenschutz und Arbeitsplatzverlust, berücksichtigt werden. Die Balance zwischen Fortschritt und Verantwortung ist entscheidend.",
    author: "Anna Müller",
    date: "2025-02-26T14:30:00Z",
  },
  {
    id: 3,
    title: "Nachhaltigkeit im Alltag: Kleine Schritte, große Wirkung",
    content:
      "Nachhaltigkeit beginnt mit kleinen Veränderungen im Alltag. Weniger Plastik verwenden, Energie sparen und regionale Produkte kaufen sind einfache, aber effektive Schritte, um die Umwelt zu schützen. Jeder Beitrag zählt und hilft, eine bessere Zukunft für kommende Generationen zu gestalten.",
    author: "Jonas Schneider",
    date: "2025-01-30T09:15:00Z",
  },
  {
    id: 4,
    title: "Die Rolle von Cybersecurity in der digitalen Welt",
    content:
      "In einer zunehmend vernetzten Welt ist Cybersecurity wichtiger denn je. Unternehmen und Privatpersonen müssen Maßnahmen ergreifen, um ihre Daten vor Bedrohungen wie Hacking und Phishing zu schützen. Starke Passwörter, Zwei-Faktor-Authentifizierung und regelmäßige Updates sind essenzielle Schutzmechanismen.",
    author: "Laura Becker",
    date: "2024-11-30T09:15:00Z",
  },
];

let lastId = 4;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
