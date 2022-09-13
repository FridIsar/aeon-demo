window.onload = function ()	{

for (let i = 0;i < 100;++i){
	let div = document.createElement('div');
	div.innerHTML = 'PROJECT '+i
	div.classList.add('button')
	document.getElementById('project-list').appendChild(div)	
}
prep_modal()
generate_wordcloud()
}