

//O(1) lookup / Hashmap here

const translations = {

    en: {
        ubcBoost: "UBC Boost",
        ubcQuickLinks: "UBC Quick Links",
        download: "Download",
        otherResources: "Other Resources",
        onlineCommunity: "Online Community",
        settings: "Settings",

        rateExtension: "Rate UBC Enhanced Chrome Extension",
        ubcCard: "UBC Card",
        searchBar: "Search Bar",
        otherLinks: "Other links",
        downloadApp: "Download App",

        coursePlanner: "UBC Course Planner",
        courseFinder: "UBC Course Finder",

        subreddit: "UBC Subreddit",
        discord: "UBC Discord",

        searchTitle: "Search Bar",
        search: "Search",
        back: "← Back",

        language: "Language",
        faculty: "Faculty",
        program: "Program",
        campus: "Campus",
        done: "Done"

    },
    fr: {
        ubcBoost: "UBC Boost",
        ubcQuickLinks: "Liens rapides UBC",
        download: "Téléchargement",
        otherResources: "Autres ressources",
        onlineCommunity: "Communauté",
        settings: "Paramètres",

        rateExtension: "Évaluer l’extension Chrome UBC Boost",
        ubcCard: "Carte UBC",
        searchBar: "Barre de recherche",
        otherLinks: "Autres liens",
        downloadApp: "Téléchargement d'app",

        coursePlanner: "Planificateur de cours",
        courseFinder: "Recherche de cours",

        subreddit: "Sous-reddit UBC",
        discord: "Discord UBC",

        searchTitle: "Barre de recherche",
        search: "Rechercher",
        back: "← Retour",

        language: "Langue",
        faculty: "Faculté",
        program: "Programme",
        campus: "Campus",
        done: "Terminé"
    },
    zh: {


    },
    jp: {


    },
    kr: {


    },
    de: {


    },
    ru: {


    },
    ar: {


    },
    es: {


    },
    vi: {


    },
    hi: {


    },
    pt: {


    },


}



function applyLanguage(lang) {

    const dict = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach(x => {

        const key = x.dataset.i18n; 

        if(dict[key]){
            x.textContent = dict[key]; 
        }
    });

}