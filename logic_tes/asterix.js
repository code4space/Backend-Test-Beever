let words = "beever";

// Buatlah skema logika untuk memuat kata diatas menjadi berbentuk seperti berikut : 
// b
// be
// bee
// beev
// beeve
// beever

let newWords = ''
for (let i = 0; i < words.length; i++) {
    newWords += words[i]
    console.log(newWords) 
}