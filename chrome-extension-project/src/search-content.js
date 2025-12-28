const search_dict = {
    "rate": "#rateUBCChromeExtension",
    "rate extension": "#rateUBCChromeExtension",
    //"search bar": "#searchbar",
    "other links": "#otherlinks-btn",

    "download": "https://www.download.ubc.ca",
    "download app": "https://www.download.ubc.ca",

    "course planner": "https://www.ubcplanner.com/",
    "course finder": "https://www.ubcfinder.com/",
    "ubc planner": "https://www.ubcplanner.com/",
    "ubc finder": "https://www.ubcfinder.com/",

    "reddit": "https://www.reddit.com/r/UBC/",
    "ubc reddit": "https://www.reddit.com/r/UBC/",
    "discord": "https://discord.gg/YhUHKKP",
    "ubc discord": "https://discord.gg/YhUHKKP",

    "ubc": "https://www.ubc.ca/",
    "ssc": "https://students.ubc.ca/",
    "student service center": "https://students.ubc.ca/",
    "workday": "https://wd10.myworkday.com/wday/authgwy/ubc/login-saml2.htmld",
    "canvas": "https://canvas.ubc.ca/",
    "library": "https://www.library.ubc.ca/",
    "map": "https://www.maps.ubc.ca/",
    "housing": "https://vancouver.housing.ubc.ca/",
    "bookstore": "https://bookstore.ubc.ca/",
    "meal plan": "https://food.ubc.ca/meal-plans/residence-meal-plan-all-access-dining/",
    "wiki": "https://ubcwiki.ca/",

    //"settings": "#settings-btn",

    "work learn": "https://students.ubc.ca/career/work-learn-program/",
    "jobs": "https://students.ubc.ca/career/co-op/",
    "coop": "https://students.ubc.ca/career/co-op/",
    "calendar": "https://www.calendar.ubc.ca/vancouver/",
    "myaccount": "https://www.myaccount.ubc.ca/",
    "news": "https://news.ubc.ca/",
    "upass": "https://upassbc.translink.ca/",
    "piazza": "https://piazza.com/",
    "prairielearn": "https://us.prairielearn.com/"
}
/*
function search_link(input_from_user){

    if(!input_from_user) return null; 

    else search_dict[input_from_user.toLowercase().trim()] || "Nothing we found matches your request.";

}
*/

const searchContent = document.querySelector(".search-content");
const searchInput = document.getElementById("searchInput");

function getSuggestions(input) {
  if (!input) return [];

  const q = input.toLowerCase().trim();

  return Object.entries(search_dict)
    .filter(([key]) => key.toLowerCase().trim().includes(q))
    .map(([key, link]) => ({ key, link }));
}


function renderSuggestions(list) {

  searchContent.innerHTML = "";

  if (list.length === 0) {

    searchContent.classList.remove("scrollable");
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "search-item";
    div.textContent = item.key;

    div.onclick = () => {

      if (item.link.startsWith("#")) {
        document.querySelector(item.link)?.click();
      } else {
        window.open(item.link, "_blank");
      }
    };

    searchContent.appendChild(div);
    
  });

  if (list.length > 7) {
    searchContent.classList.add("scrollable");
  } else {
    searchContent.classList.remove("scrollable");
  }
}


searchInput.addEventListener("input", e => {

  const suggestions = getSuggestions(e.target.value);
  console.log(suggestions); 
  renderSuggestions(suggestions);

});