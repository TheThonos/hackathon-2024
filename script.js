const text = document.getElementById("input-text");
const button = document.getElementById("button");
const targetLang = document.getElementById("target-lang");
const inputLang = document.getElementById("input-lang");
const output = document.getElementById("result");

button.addEventListener('click', async () => {
    let inputText = text.value.match(/((^|\s)[^ ]*){1,100}[\.?!;:]/gm);
    for(let input of inputText){
        output.innerText += ' ' + await request(input, targetLang.value, inputLang.value);
    }
});

async function request(text, target, source){
    let res = await fetch('https://api.nlpcloud.io/v1/nllb-200-3-3b/translation', {
        method: 'POST',
        headers: {
            'Authorization': 'Token 38c233a8996b1d3b740ec03d3696a976cd31a1cb',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text,
            target,
            source
        })
    })
    if(res.status == 429){
        await new Promise(resolve => setTimeout(resolve, 1000))
        return await request(text, target, source);
    }
    let json = await res.json();
    console.log(json.translation_text);
    return json.translation_text;
}
