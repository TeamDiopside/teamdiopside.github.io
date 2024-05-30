async function loadProjectPage(projectName, projectInfo, projectId, projectType) {
    const response = await fetch('../project.html');
    let baseHtml = await response.text();

    baseHtml = baseHtml.replace(/{{projectName}}/g, projectName);
    baseHtml = baseHtml.replace(/{{projectInfo}}/g, projectInfo);
    baseHtml = baseHtml.replace(/{{projectId}}/g, projectId);

    window.document.write(baseHtml);
    window.document.close();

    var linkContainer = document.getElementById('downloads');

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
        addDownloadButton("https://modrinth.com/" + mrProjectType + "/" + projectId, "../assets/modrinth_icon.png", "Modrinth", linkContainer)
    }
    if (cfProjectType != "") {
        addDownloadButton("https://www.curseforge.com/minecraft/" + cfProjectType + "/" + projectId, "../assets/curseforge_icon.png", "CurseForge", linkContainer)
    }
}

function addDownloadButton(href, imgSrc, platformName, linkContainer) {
    var newLink = document.createElement('a');
    newLink.href = href;
    newLink.target = '_blank';
    newLink.classList.add('project');

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
    linkContainer.appendChild(newLink);
}