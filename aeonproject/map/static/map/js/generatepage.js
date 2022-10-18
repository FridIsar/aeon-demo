var occursPageBackup = null;
var occursTitleBackup = null;

function generateOccursPage(word)	{
	let content = document.createElement('div');
	let title = "There are " + allWords[word].occurrences + " occurrences of <span style='color: #ECA72C'>" + word + "</span> in the following project(s):"

	var parent = document.createElement('div');
	let pages = allWords[word].pages;
	for (let i = 0; i < pages.length; i++)	{
		var child = document.createElement('div');
		var grandchild = document.createElement('span');
		grandchild.innerHTML = pages[i];
		child.setAttribute('onclick',`generateTargetPage("${pages[i]}", ${true});`);
		grandchild.classList.add('button')
		child.classList.add('button-group')
		child.appendChild(grandchild)
		parent.appendChild(child)
	}
	content.appendChild(parent)
	occursPageBackup = content.innerHTML;
	occursTitleBackup = title;
	openModal(title, content.innerHTML)
}

function generateTargetPage(pageTitle, fromOccursPage)	{
	let content = document.createElement('div');

	for (var bigTitle in pagesDict)	{
		if (bigTitle == pageTitle)	{
			pageContents = pagesDict[pageTitle].contents;
			break;
		}

		let subProjects = pagesDict[bigTitle]["sub-projects"];
		for (let i = 0; i < subProjects.length; i++)	{
			let subTitle = Object.keys(subProjects[i])[0];
			if (subTitle == pageTitle)	{
				pageContents = subProjects[i][pageTitle].contents;
				break;
			}
		}
	}

	
	for (let i = 0; i < pageContents.length; i++)	{
		if (pageContents[i].type == "image")	{
			let img = document.createElement('img');
			img.setAttribute('src',pageContents[i].content);
			content.appendChild(img)
		}
		else {
			if (pageContents[i].type == "text")	{
				let p = document.createElement('p');
				p.innerHTML = pageContents[i].content;
				content.appendChild(p)
			}
			else {
				let div = document.createElement('div');
				div.innerHTML = `<video class="modal-video" autoplay><source src="${staticImageUrl}${pageContents[i].content}" type='video/mp4'></video>`
				content.appendChild(div)
			}
		}

	}
	var arrow = document.getElementById("return-modal");
	if (fromOccursPage)	{
		arrow.onclick = function() {
    		openModal(occursTitleBackup, occursPageBackup)
    		arrow.onclick = function() {
    		modal.style.display = "none";
  		}
  		}
	}
	else {
		arrow.onclick = function() {
    		modal.style.display = "none";
  		}
	}
	openModal(pageTitle, content.innerHTML)
}