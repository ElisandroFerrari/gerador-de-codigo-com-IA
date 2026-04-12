let botao = document.querySelector(".botao-gerar")
let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    botao.innerText = "Gerando... ⏳"

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chave
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com o código dentro de uma tag <style> e a div do elemento. Não use markdown ou explicações."
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado

    resultadoCodigo.srcdoc = `
        <style>
            body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #000;
                color: white;
                overflow: hidden;
            }
        </style>
        ${resultado}
    `
    
    botao.innerText = "Gerar Código ⚡️"
}

botao.addEventListener("click", gerarCodigo)