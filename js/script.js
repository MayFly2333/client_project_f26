document.getElementById("current-year").textContent = new Date().getFullYear();

// For this part I created a "Save" function
// I have refered to https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

const saveButtons = document.querySelectorAll(".save-resource");

let savedResources = [];

try {
    savedResources = JSON.parse(localStorage.getItem("savedResources") || "[]");
    if (!Array.isArray(savedResources)) {
        savedResources = [];
    }
} catch (error) {
    savedResources = [];
}

saveButtons.forEach(function (button) {
    const resourceId = button.dataset.resourceId;

    function updateButton() {
        const isSaved = savedResources.includes(resourceId);

        button.textContent = isSaved ? "Saved" : "Save";
        button.setAttribute("aria-pressed", String(isSaved));
    }

    updateButton();

    button.addEventListener("click", function () {
        if (savedResources.includes(resourceId)) {
            savedResources = savedResources.filter(function (id) {
                return id !== resourceId;
            });
        } else {
            savedResources.push(resourceId);
        }

        try {
            localStorage.setItem("savedResources", JSON.stringify(savedResources));
        } catch (error) {
            console.warn("Unable to save resources in this browser.", error);
        }

        updateButton();
    });
});


// Create a resource catalog to map resource IDs to their titles and URLs


const resourceCatalog = {
    "social-identity": {
        title: "Social Identity Snapshot",
        url: "https://sites.lsa.umich.edu/equitable-teaching/social-identity-snapshot",
        stage: "Preparing & Starting Your Experience"
    },
    "check-yourself": {
        title: '"Check Yourself" Community Engagement Checklist',
        url: "https://docs.google.com/document/d/1Qt9YeStVwDHjwJhOLAz42JSNQR2lFMurdUtxtdrGkuc/edit?tab=t.0#heading=h.ch0bvccjkrzn",
        stage: "Preparing & Starting Your Experience"
    },
    "iap2-spectrum": {
        title: "IAP2 Spectrum of Public Participation",
        url: "https://drive.google.com/file/d/1zc1RNlrDxV51-muOERdDTnINQcquJpOA/view?usp=sharing",
        stage: "Preparing & Starting Your Experience"
    },
    "project-scoping": {
        title: "Project Scoping Handout & Terms",
        url: "https://docs.google.com/document/d/1TrEDolwmOIlXgYgAP9VvlOGoYOwFfe6KxzZOgZSVYVw/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "student-org-officer": {
        title: "Student Org Officer",
        url: "https://docs.google.com/document/d/1AexsV_JeSd0kRUBbcifZpfBu6y6Zi8Y0iJScp1I3gkM/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "project-manager-guide": {
        title: "Project Manager Guide",
        url: "https://docs.google.com/document/u/0/d/1uwOOS0TrXWzcSShj8DUFpckWo0t1UNu_Q7WVbZnLhX0/edit",
        stage: "Preparing & Starting Your Experience"
    },
    "pm-commitment": {
        title: "Project Manager Commitment Form",
        url: "https://docs.google.com/document/d/1U4lCNGyWKJ3C2i_VgFqAR45Z4zF1FehuthuqT-M2wdI/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "pm-worksheet": {
        title: "Project Management Worksheet",
        url: "https://docs.google.com/document/d/1twc-7TYWmb_PNrOBiDI1NuJqJAuhluTICr22GRd_NLc/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "client-email": {
        title: "Initial Client Email Examples",
        url: "https://docs.google.com/document/d/1fWFXwoW5fKX_Tctn97Gio5XZDwILNlqIOyKKE8Yk5J0/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "meeting-agenda": {
        title: "Initial Client Meeting Sample Agenda",
        url: "https://docs.google.com/document/d/1ItXxYauAcPoaGMUZWuJsX-OLFfGmeBOWT7JNhoZxGyU/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "ginsberg-toolkit": {
        title: "Ginsberg Center Student-Client Partnership Toolkit",
        url: "https://ginsberg.umich.edu/article/campus-community-partnerships-toolkit",
        stage: "Preparing & Starting Your Experience"
    },
    "partnership-guide": {
        title: "Student-Client Partnership Guide",
        url: "https://drive.google.com/file/d/12ealxkKCvOZajxK7doyUXu_k2LyKPUP2/view?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "partnership-agreement": {
        title: "Student Org-ELO Partnership Agreement Template",
        url: "https://docs.google.com/document/d/1y5Y2wc1ADz0n_ht26kPYlFK3Zm9i3UR_Z0OMWP3Q_xQ/edit?usp=drive_link",
        stage: "Preparing & Starting Your Experience"
    },
    "so-ell-schedule": {
        title: "SO-ELL Schedule",
        url: "https://docs.google.com/spreadsheets/d/1YeK2WerSbhaU5hjEg9wxdXmzBx9lgRy2yHBKAH-SxiA/edit?gid=166831640#gid=166831640",
        stage: "Preparing & Starting Your Experience"
    },
    "exiting-project": {
        title: "Exiting a Community-Engaged Project Worksheet",
        url: "https://docs.google.com/document/d/1-gfg_EZ3T8pa3T0a130Qvtpl1bYoLOVEHSNpGHcJtFA/edit?usp=drive_link",
        stage: "Ending Your Experience"
    },
    "project-scoping-final": {
        title: "Project Scoping Handout & Terms (Final Review)",
        url: "https://docs.google.com/document/d/1TrEDolwmOIlXgYgAP9VvlOGoYOwFfe6KxzZOgZSVYVw/edit?usp=drive_link",
        stage: "Ending Your Experience"
    },
    "ginsberg-closing": {
        title: "Ginsberg Center Student-Client Partnership Toolkit (Closing Section)",
        url: "https://ginsberg.umich.edu/article/campus-community-partnerships-toolkit",
        stage: "Ending Your Experience"
    },
    "project-resumes": {
        title: "How to Include Project Experience on Student Resumes",
        url: "https://docs.google.com/document/d/1mjyX6jgqXFrY7SFYaA3J2cTh1ZnHH0FKF5aUKfXzXKo/edit?tab=t.0",
        stage: "Ending Your Experience"
    },
    "umsi-social-media": {
        title: "How to Engage with UMSI on Social Media",
        url: "https://docs.google.com/document/d/1jwQg_Y4jECLPHqcyOtJtDTK5x-68KstexfPbh6jXHnA/edit?usp=drive_link",
        stage: "Ending Your Experience"
    },
    "star-reflection": {
        title: "STAR Method Project Reflection Sheet",
        url: "https://careercenter.umich.edu/content/interviewing-resources",
        stage: "Ending Your Experience"
    }

};

const savedResourcesList = document.getElementById("saved-resources-list");


function renderSavedResources() {
    if (!savedResourcesList) {
        return;
    }

    savedResourcesList.replaceChildren();

    const stages = [
        "Preparing & Starting Your Experience",
        "Ending Your Experience"
    ];
    stages.forEach(function (stageName) {
        const section = document.createElement("section");

        const heading = document.createElement("h3");
        heading.textContent = stageName;
        section.appendChild(heading);
        section.className = "saved-stage";

        const stageResources = savedResources.filter(function (id) {
            return resourceCatalog[id] &&
                resourceCatalog[id].stage === stageName;
        });

        if (stageResources.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No saved resources in this stage yet.";
            section.appendChild(message);
        } else {
            const list = document.createElement("ul");

            stageResources.forEach(function (id) {
                const resource = resourceCatalog[id];

                const item = document.createElement("li");

                const link = document.createElement("a");
                link.href = resource.url;
                link.textContent = resource.title;
                item.className = "saved-resource-item";

                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.textContent = "Remove";
                removeButton.setAttribute(
                    "aria-label",
                    "Remove " + resource.title + " from saved resources"
                );
                removeButton.className = "remove-resource";

                removeButton.addEventListener("click", function () {
                    savedResources = savedResources.filter(function (savedId) {
                        return savedId !== id;
                    });

                    try {
                        localStorage.setItem(
                            "savedResources",
                            JSON.stringify(savedResources)
                        );
                    } catch (error) {
                        console.warn("Unable to update saved resources.", error);
                    }

                    renderSavedResources();
                });

                item.appendChild(link);
                item.appendChild(removeButton);
                list.appendChild(item);
            });

            section.appendChild(list);
        }

        savedResourcesList.appendChild(section);
    });
}

renderSavedResources();
