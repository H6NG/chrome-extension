
function waitfor(duration){
    
    return new Promise(resolve => setTimeout(resolve, duration));

}

document.addEventListener('DOMContentLoaded', function() {

    const settingsBtn = document.getElementById('settings-btn');
    const backBtn = document.getElementById('back-btn');
    const doneBtn = document.getElementById('settings-done-btn');
    const mainLinks = document.getElementById('main-links');
    const settingsPanel = document.getElementById('settings-panel');
    const otherlinksbutton = document.getElementById('otherlinks-btn');
    const otherLinksPanel = document.getElementById('otherlinks-panel');
    const rateUBCChromeExtension = document.getElementById('rateUBCChromeExtension');
    const searchbar = document.getElementById('searchbar');
    const searchPanel = document.getElementById('search-panel');


    const report_issue_button = document.getElementById('report_issue_button');
    const report_issue = document.getElementById("report_issues"); 

    if(report_issue_button) {

        report_issue_button.addEventListener('click', function(e) {

            e.preventDefault(); 

            report_issue.style.display = 'block'; 
            mainLinks.style.display = 'none';
            otherLinksPanel.style.display = 'none'; 
            searchPanel.style.display = 'none'; 

        })
        
    }
    if(searchbar) {
        searchbar.addEventListener('click', (e) => {
            e.preventDefault();
            mainLinks.style.display = 'none';
            otherLinksPanel.style.display = 'none'; 
            searchPanel.style.display = 'block'; 
        });
    }
    if(rateUBCChromeExtension) {
        rateUBCChromeExtension.addEventListener('click', function(e) {
            e.preventDefault();
            mainLinks.style.display = 'none'; 

            // Display 5 starts if hovered, it fills inside the stars.
            // Add a comment section for suggestion or improvment 
            // Add a send button to actually send the request to the database.
            //Send result to a database MangoDB. 

            //or just direct the user to the chrome extension download thingy 
        })
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mainLinks.style.display = 'none';
            settingsPanel.style.display = 'block';
        });
    }
    if (otherlinksbutton){
        otherlinksbutton.addEventListener('click', (e) => {
            e.preventDefault(); 
            mainLinks.style.display = 'none'; 
            otherLinksPanel.style.display = 'flex'; 
        });
    }

    const backToMain = (e) => {
        e.preventDefault();
        settingsPanel.style.display = 'none';
        otherLinksPanel.style.display = 'none';
        searchPanel.style.display = 'none';
        mainLinks.style.display = 'flex';
        report_issue.style.display = 'none'; 
        quick_notes.style.display = "none";
    }
    const backButton = document.getElementById('backButton');
    const backButton2 = document.getElementById('backButton2');
    backButton.addEventListener('click', backToMain);
    backButton2.addEventListener('click', backToMain);
    backBtn.addEventListener('click', backToMain);
    

    chrome.storage.local.get(['language', 'faculty', 'program', 'campus'], function(result) {
        if(result.language) document.getElementById('language').value = result.language;
        if(result.faculty) document.getElementById('faculty').value = result.faculty;
        if(result.program) document.getElementById('program').value = result.program;
        if(result.campus) document.getElementById('campus').value = result.campus;
    });

    //we load on startup
    chrome.storage.local.get("language", ({language}) => {

        applyLanguage(language || "en"); 
    })

    if (doneBtn) {
        doneBtn.addEventListener('click', function() {

            const lang = document.getElementById('language').value; 
            chrome.storage.local.set({
                language: lang,
                faculty: document.getElementById('faculty').value,
                program: document.getElementById('program').value,
                campus: document.getElementById('campus').value
            }, function() {

                applyLanguage(lang);
                
                settingsPanel.style.display = 'none';
                mainLinks.style.display = 'flex';
                searchPanel.style.display = 'none';
            });
        });
    }

    const donebutton = document.getElementById("understood-button");

    donebutton.addEventListener("click", () => {

        const warning = document.getElementById("warning"); 

        chrome.storage.local.set(

            { ubcDisclaimerAccepted: true }, () => {

                if(warning) {
                    warning.style.display = "none"; 
                }
            }
        )
    })


    const warning = document.getElementById("warning");

    chrome.storage.local.get(["ubcDisclaimerAccepted"], (result) => {
        if (result.ubcDisclaimerAccepted && warning) {
            warning.style.display = "none";
        }
    }); 


    const notetaker = document.getElementById("notetaker");
    const quick_notes = document.getElementById("quick_notes");
    const text_area = document.getElementById("text_area");
    const savedLabel = document.getElementById("isSaved");

    notetaker.addEventListener("click", function (e) {

        e.preventDefault(); 
        report_issue.style.display = 'none'; 
        mainLinks.style.display = 'none';
        otherLinksPanel.style.display = 'none'; 
        searchPanel.style.display = 'none'; 
        quick_notes.style.display = "block";

        chrome.storage.local.get("quickNote", (result) => {
            const note = result.quickNote;

            if (note) {
                console.log("Saved note:", note);
                document.getElementById("text_area").value = note;
            }
        });

    })

    text_area.addEventListener("input", () => {

        const value = text_area.value.trim();

        if (!value) {
            savedLabel.textContent = "Saved";
            return;
        }

        chrome.storage.local.set({ quickNote: value }, () => {

            savedLabel.textContent = "Saved";

        });

    })

    const quick_back_btn = document.getElementById("quick_back_btn"); 

    quick_back_btn.addEventListener("click", function(e) {

        e.preventDefault();

        settingsPanel.style.display = 'none';
        otherLinksPanel.style.display = 'flex';
        searchPanel.style.display = 'none';
        mainLinks.style.display = 'none';
        report_issue.style.display = 'none'; 
        quick_notes.style.display = "none";

    })

    const report_back_btn = document.getElementById("report_back_btn");

    report_back_btn.addEventListener("click", function(e) {

        e.preventDefault();

        settingsPanel.style.display = 'none';
        otherLinksPanel.style.display = 'flex';
        searchPanel.style.display = 'none';
        mainLinks.style.display = 'none';
        report_issue.style.display = 'none'; 
        quick_notes.style.display = "none";

    })


    const messageInput = document.getElementById("reportMessage");
    const charCount = document.getElementById("charCount");

    messageInput.addEventListener("input", () => {
        charCount.textContent = `${messageInput.value.length} / 200`;
    });

    const send_report_button = document.getElementById("send-btn");
    const email_report = document.getElementById("email_report");
    const subject_report = document.getElementById("subject_report");
    const message_report = document.getElementById("reportMessage");

    send_report_button.addEventListener('click', async function(e) {

        hasError = false;

        email_report.style.borderColor = "";
        subject_report.style.borderColor = "";
        message_report.style.borderColor = "";

        e.preventDefault(); 
        const email_value = email_report.value; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email_value)){
            email_report.style.borderColor = "red";
            email_report.placeholder = "please enter a valid email";
            hasError = true; 
        }
        if(!subject_report.value){
            subject_report.style.borderColor = "red";
            subject_report.placeholder = "please write a subject";
            hasError = true; 
        }
        if(!message_report.value){

            message_report.style.borderColor = "red";
            message_report.placeholder = "please write a message";
            hasError = true; 

        }
        if(hasError == false){

            try {
                send_report_button.disabled = true;
                send_report_button.textContent = "Sending...";

                const response = await fetch("https://ubcece.onrender.com/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email_value,
                    subject: subject_report.value,
                    message: message_report.value,
                }),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.log(data.error || "failed to send report");
                    send_report_button.textContent = "Failed";
                    send_report_button.style.backgroundColor = "red"; 
                    return;
                }

                send_report_button.textContent = "Sent";
                send_report_button.style.backgroundColor = "green"; 
                send_report_button.disabled = true;
                
                await waitfor(6000);

                email_report.value = "";
                subject_report.value = "";
                message_report.value = "";
                charCount.textContent = "0 / 200";

            } catch (err) {

                console.error(err);
                send_report_button.textContent = "Failed";
                send_report_button.style.backgroundColor = "red"; 

            } finally {

                send_report_button.disabled = false;
                send_report_button.style.backgroundColor = "";
                send_report_button.textContent = "Send";
            }
            
        }
        
    })

});