const express = require("express");
const loginTranslations = require("../translations/loginTranslations.json")
const registerTranslations = require("../translations/loginTranslations.json")
const faqTranslations = require("../translations/faqTranslations.json")

const router = express.Router();

router.get('/faq', (req, res) => {

    const targetLanguage = req.query.lang || 'en';

    const faqContent = faqTranslations[targetLanguage] || faqTranslations['en'];

    res.json(faqContent);
});

router.get('/login', (req, res) => {
    const targetLanguage = req.query.lang || 'en'; 
    const loginContent = loginTranslations[targetLanguage] || loginTranslations['en'];
    res.json(loginContent);
});

router.get('/register', (req, res) => {
    const targetLanguage = req.query.lang || 'en';
    const registerContent = registerTranslations[targetLanguage] || registerTranslations['en'];
    res.json(registerContent);
});

module.exports = router;