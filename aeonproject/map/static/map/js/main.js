window.onload = function ()	{
for (let i = 0;i < 5;++i){
	let group = document.createElement('div');
	group.classList.add('button-group')
	let div = document.createElement('div');
	div.innerHTML = 'Þingvellir á Þórsnesi'
	div.onclick = function() {generateTargetPage("Þingvellir á Þórsnesi", false);}
	div.classList.add('button')
	div.classList.add('button-lead')
	group.appendChild(div)
	let d = i+5
	i+=1
	while (i < d)	{
		div = document.createElement('div');
		div.innerHTML = 'Blótsteinn '+i
		div.onclick = function() {generateTargetPage("Blótsteinn", false);}
		div.classList.add('button')
		group.appendChild(div)
		i+=1
	}
	document.getElementById('project-list').appendChild(group)	
}
prep_modal()
generate_wordcloud()

}