var occursPageBackup = null;

function generateOccursPage(word)	{
	let content = document.createElement('div');
	let title = "There are " + allWords[word].occurrences + " occurrences of \"" + word + "\" in the following file(s):"

	var ul = document.createElement('ul');
	let pages = allWords[word].pages;
	for (let i = 0; i < pages.length; i++)	{
		var li = document.createElement('li');
		li.innerHTML = pages[i];
		li.setAttribute('onclick',`generateTargetPage("${pages[i]}", ${true});`);
		ul.appendChild(li)
	}
	content.appendChild(ul)
	occursPageBackup = content.innerHTML;
	openModal(title, content.innerHTML)
}

function generateTargetPage(pageTitle, fromOccursPage)	{
	let content = document.createElement('div');
	pageContents = pagesDict[pageTitle].contents;
	for (let i = 0; i < pageContents.length; i++)	{
		if (pageContents[i].type == "image")	{
			let img = document.createElement('img');
			img.setAttribute('src',pageContents[i].content);
			content.appendChild(img)
		}
		else {
			let p = document.createElement('p');
			p.innerHTML = pageContents[i].content;
			content.appendChild(p)
		}

	}
	var arrow = document.getElementById("return-modal");
	if (fromOccursPage)	{
		arrow.onclick = function() {
    		openModal(pageTitle, occursPageBackup)
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