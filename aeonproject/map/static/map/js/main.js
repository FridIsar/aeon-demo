window.onload = function ()	{
	let group;
	for (let title in pagesDict){
		let div = document.createElement('div');
		div.classList.add('button')
		div.innerHTML = title 
		div.onclick = function() {generateTargetPage(title, false);} 
		if (title == "Þingvellir á Þórsnesi")	{
			group = document.createElement('div');
			group.classList.add('button-group')
			div.classList.add('button-lead')
			document.getElementById('project-list').appendChild(group)	
		}
		group.appendChild(div)
	}

	prep_modal()
	generate_wordcloud()
	initiateMap()
}