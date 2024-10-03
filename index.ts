import markdownHtml from "zenn-markdown-html";
import matter from "gray-matter";
import { readFileSync } from "fs";

function compile() {
  let raw = readFileSync(0, "utf-8");
  const {
    data: { title },
    content,
  } = matter(raw);

  const article = markdownHtml(content);
  const css = readFileSync(require("zenn-content-css").default);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js" id="katex-js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
  <style>${css}</style>
  <style>
    body {
      background-color: #edf2f7;
    }
    header {
      margin-top: 50px;
      height: 100px;
      display: grid;
      place-items: center;
    }
    article {
      background-color: white;
      border-radius: 12px;
      margin: 0 auto;
      max-width: 800px;
      padding: 36px;
    }
    .katex-mathml {
      font-size: 1.2rem;
    }
  </style>
</head>

<body>
  <header>
    <h1 class="title">${title}</h1>
  </header>
  <main>
    <article class="znc">${article}</article>
  </main>
  <script defer>
  for (let element of document.querySelectorAll("embed-katex")) {
    console.log(element.textContent);
    katex.render(element.textContent, element, {
        throwOnError: true
    });
  }
  </script>
</body>
</html>
`;
  return html;
}

process.stdout.write(compile());
