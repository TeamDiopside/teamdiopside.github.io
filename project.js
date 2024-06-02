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
        // Downloads
        addDownloadButton("https://modrinth.com/" + mrProjectType + "/" + projectId, "../assets/modrinth_icon.png", "Modrinth", "mr-bg");
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                const obj = JSON.parse(xmlHttp.responseText);
                const latest = obj[0];
                addLatestButton(latest.files[0].url, latest.name, latest.downloads);
            }
        };
        xmlHttp.open("GET", "https://api.modrinth.com/v2/project/" + projectId + "/version", true); // true for asynchronous 
        xmlHttp.send(null);

        // Gallery
        let xmlHttp2 = new XMLHttpRequest();
        xmlHttp2.onreadystatechange = function() {
            if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
                const obj = JSON.parse(xmlHttp2.responseText);
                const gallery = obj.gallery;
                if (gallery.length == 0) {
                    return;
                }

                var mainDiv = document.getElementById('main');

                var galleryDiv = document.createElement('div');
                galleryDiv.classList.add('projects');
                galleryDiv.id = 'images';
                mainDiv.appendChild(galleryDiv);

                var gallerySection = document.createElement('section');
                gallerySection.classList.add('container');
                galleryDiv.appendChild(gallerySection);

                var galleryTitle = document.createElement('h2');
                galleryTitle.textContent = "Gallery";
                gallerySection.appendChild(galleryTitle);
                
                var gridDiv = document.createElement('div');
                gridDiv.id = 'imageGrid';
                gallerySection.appendChild(gridDiv);

                for (var i = 0; i < gallery.length; i++) {
                    var image = document.createElement('img');
                    image.src = gallery[i].url;
                    gridDiv.appendChild(image);
                }
            }
        };
        xmlHttp2.open("GET", "https://api.modrinth.com/v2/project/" + projectId, true); // true for asynchronous 
        xmlHttp2.send(null);
    }
    if (cfProjectType != "") {
        addDownloadButton("https://www.curseforge.com/minecraft/" + cfProjectType + "/" + projectId, "../assets/curseforge_icon.png", "CurseForge", "cf-bg");
    }
}

function addDownloadButton(href, imgSrc, platformName, bgClass) {
    var newLink = document.createElement('a');
    newLink.href = href;
    newLink.target = '_blank';
    newLink.classList.add('project');
    newLink.classList.add('noSelect');
    newLink.classList.add(bgClass);

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

function addLatestButton(href, version, downloads, bgClass) {
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
    downloads = commafy(downloads);
    anotherDescription.textContent = downloads + " Downloads";
    anotherDescription.classList.add('download-color');

    newDiv.appendChild(newHeading);
    newDiv.appendChild(newDescription);
    newDiv.appendChild(anotherDescription);

    newLink.appendChild(newDiv);
    
    var linkContainer = document.getElementById('download');
    linkContainer.appendChild(newLink);
}

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}