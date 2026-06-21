const express = require('express');
const app = express();
app.use(express.json());

// 1. Эхо
app.get('/echo', (req, res) => {
    res.json({ text: req.query.text || '' });
});

// 2. Длина строки
app.get('/length', (req, res) => {
    let text = req.query.text || '';
    res.json({ length: text.length });
});

// 3. Реверс
app.get('/reverse', (req, res) => {
    let text = req.query.text || '';
    let reversed = text.split('').reverse().join('');
    res.json({ reversed: reversed });
});

// 4. Регистр
app.get('/case', (req, res) => {
    let text = req.query.text || '';
    let type = req.query.type;
    
    if (type === 'upper') {
        res.json({ result: text.toUpperCase() });
    } else if (type === 'lower') {
        res.json({ result: text.toLowerCase() });
    } else {
        res.json({ result: text });
    }
});

// 5. Подсчет символов
app.get('/count-chars', (req, res) => {
    let text = req.query.text || '';
    let char = req.query.char || '';
    
    if (char === '') {
        res.json({ count: 0 });
        return;
    }
    
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
            count++;
        }
    }
    res.json({ count: count });
});

// 6. Удаление пробелов
app.post('/trim', (req, res) => {
    let text = req.body.text || '';
    res.json({ trimmed: text.trim() });
});

// 7. Замена подстроки
app.put('/replace', (req, res) => {
    let text = req.body.text || '';
    let search = req.body.search || '';
    let replace = req.body.replace || '';
    
    if (search === '') {
        res.json({ result: text });
        return;
    }
    
    let result = text.split(search).join(replace);
    res.json({ result: result });
});

// 8. Палиндром
app.get('/palindrome', (req, res) => {
    let text = req.query.text || '';
    
    
    let clean = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            clean += text[i].toLowerCase();
        }
    }
    
   
    let reversed = '';
    for (let i = clean.length - 1; i >= 0; i--) {
        reversed += clean[i];
    }
    
    res.json({ isPalindrome: clean === reversed });
});

// 9. Разбиение на слова
app.get('/words', (req, res) => {
    let text = req.query.text || '';
    
    if (text === '') {
        res.json({ words: [] });
        return;
    }
    
    let words = text.split(' ');
    
    words = words.filter(word => word !== '');
    
    res.json({ words: words });
});

// 10. Склейка строк
app.post('/concat', (req, res) => {
    let strings = req.body.strings || [];
    let separator = req.body.separator || ' ';
    
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < strings.length - 1) {
            result += separator;
        }
    }
    
    res.json({ result: result });
});

// 11. Шифр Цезаря (только английские буквы)
app.get('/caesar', (req, res) => {
    let text = req.query.text || '';
    let shift = Number(req.query.shift) || 0;
    let action = req.query.action || 'encode';
    
    if (action === 'decode') {
        shift = -shift;
    }
    
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = char.charCodeAt(0);
        
        
        if (code >= 65 && code <= 90) {
            let newCode = ((code - 65 + shift) % 26 + 26) % 26 + 65;
            result += String.fromCharCode(newCode);
        }
        
        else if (code >= 97 && code <= 122) {
            let newCode = ((code - 97 + shift) % 26 + 26) % 26 + 97;
            result += String.fromCharCode(newCode);
        }
        
        else {
            result += char;
        }
    }
    
    res.json({ result: result });
});

// 12. Статистика символов
app.get('/char-stats', (req, res) => {
    let text = req.query.text || '';
    text = text.toLowerCase();
    
    let stats = {};
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (stats[char] === undefined) {
            stats[char] = 1;
        } else {
            stats[char] = stats[char] + 1;
        }
    }
    
    res.json({ stats: stats });
});

// 13. Валидация email
app.get('/validate-email', (req, res) => {
    let email = req.query.email || '';
    
    
    let atIndex = email.indexOf('@');
    let dotIndex = email.lastIndexOf('.');
    
    let isValid = atIndex > 0 && 
                  dotIndex > atIndex + 1 && 
                  dotIndex < email.length - 1;
    
    res.json({ isValid: isValid });
});

// 14. Случайная строка
app.get('/random-string', (req, res) => {
    let length = Number(req.query.length) || 10;
    let charset = req.query.charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    let result = '';
    
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    
    res.json({ randomString: result });
});

// 15. Regex замена
app.put('/regex-replace', (req, res) => {
    let text = req.body.text || '';
    let pattern = req.body.pattern;
    let replacement = req.body.replacement || '';
    
    if (!pattern) {
        res.json({ result: text });
        return;
    }
    
    try {
        let regex = new RegExp(pattern, 'g');
        let result = text.replace(regex, replacement);
        res.json({ result: result });
    } catch (error) {
        res.status(400).json({ error: 'Ошибка в регулярном выражении' });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});