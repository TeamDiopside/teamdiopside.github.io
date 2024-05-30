async function loadProjectPage(projectName, projectInfo, projectId, projectType, latestVersion) {
    const response = await fetch('../project.html');
    let baseHtml = await response.text();

    baseHtml = baseHtml.replace(/{{projectName}}/g, projectName);
    baseHtml = baseHtml.replace(/{{projectInfo}}/g, projectInfo);
    baseHtml = baseHtml.replace(/{{projectId}}/g, projectId);
    baseHtml = baseHtml.replace(/{{latestVersion}}/g, latestVersion);

    window.document.write(baseHtml);
    window.document.close();

    let mrProjectType = "";
    let cfProjectType = "";

    switch (projectType) {
        case "mod":
            mrProjectType = "mod";
            cfProjectType = "mc-mods";
            break;

        case "modpack":
            cfProjectType = "modpacks";
            break;
        
        case "resourcepack":
            mrProjectType = "resourcepack";
            cfProjectType = "texture-packs";
            break;
    }

    if (mrProjectType != "") {
        addDownloadButton("https://modrinth.com/" + mrProjectType + "/" + projectId, "../assets/modrinth_icon.png", "Modrinth")
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                const obj = JSON.parse(xmlHttp.responseText);
                const latest = obj[0];
                addLatestButton(latest.files[0].url, latest.name, latest.downloads);
            }
        }
        xmlHttp.open("GET", "https://api.modrinth.com/v2/project/" + projectId + "/version", true) // true for asynchronous 
        xmlHttp.send(null)
    }
    if (cfProjectType != "") {
        addDownloadButton("https://www.curseforge.com/minecraft/" + cfProjectType + "/" + projectId, "../assets/curseforge_icon.png", "CurseForge")
    }
}

function addDownloadButton(href, imgSrc, platformName) {
    var newLink = document.createElement('a');
    newLink.href = href;
    newLink.target = '_blank';
    newLink.classList.add('project');
    newLink.classList.add('noSelect');

    var newDiv = document.createElement('div');
    newDiv.classList.add('project-content');
    var newImg = document.createElement('img');
    newImg.src = imgSrc;
    newImg.alt = platformName;
    newImg.classList.add('project-image');
    var newHeading = document.createElement('h3');
    newHeading.textContent = platformName;
    newDiv.appendChild(newImg);
    newDiv.appendChild(newHeading);

    newLink.appendChild(newDiv);
    
    var linkContainer = document.getElementById('downloads');
    linkContainer.appendChild(newLink);
}



function addLatestButton(href, version, downloads) {
    var newLink = document.createElement('a');
    newLink.href = href;
    newLink.target = '_blank';
    newLink.classList.add('project');
    newLink.classList.add('noSelect');
    newLink.classList.add('latest');

    var newDiv = document.createElement('div');
    newDiv.classList.add('project-content');
    newDiv.classList.add('project-text');

    var newHeading = document.createElement('h3');
    newHeading.textContent = 'Latest Version';

    var newDescription = document.createElement('p');
    newDescription.textContent = version;

    var anotherDescription = document.createElement('p');
    anotherDescription.textContent = downloads + " Downloads";
    anotherDescription.style = "color: lime;"

    newDiv.appendChild(newHeading);
    newDiv.appendChild(newDescription);
    newDiv.appendChild(anotherDescription);

    newLink.appendChild(newDiv);
    
    var linkContainer = document.getElementById('download');
    linkContainer.appendChild(newLink);
}