var initialList

const path = {
  "type": "Feature",
  "properties": {
    "title": "fly_route"
  },
  "geometry": {
    "coordinates": [
    [-22.752579, 65.031682],
    [-22.752284, 65.032527],
    [-22.752193, 65.033161],
    [-22.75217, 65.033717],
    [-22.752215, 65.034303],
    [-22.752375, 65.034936],
    [-22.752716, 65.035551],
    [-22.753102, 65.036127],
    [-22.753716, 65.03675],
    [-22.756103, 65.038708],
    [-22.757759, 65.040136],
    [-22.758465, 65.04094],
    [-22.758757, 65.041495],
    [-22.758928, 65.042276],
    [-22.758562, 65.043263],
    [-22.757783, 65.04421],
    [-22.75715, 65.044981],
    [
      -22.755530766485926,
      65.04742196543813
    ],
    [
      -22.751946929404095,
      65.04881840486252
    ],
    [
      -22.742936537420476,
      65.04945562297873
    ],
    [
      -22.737812328383882,
      65.04988458060498
    ],
    [
      -22.735081853584532,
      65.05051548315421
    ],
    [
      -22.734120561196725,
      65.05151497564881
    ],
    [
      -22.733957180221978,
      65.05271641306638
    ],
    [
      -22.73251334229538,
      65.05498473008848
    ],
    [
      -22.728910072969136,
      65.0570889482984
    ],
    [
      -22.725180958112063,
      65.05821892230489
    ],
    [
      -22.72017518499397,
      65.0583394676872
    ],
    [
      -22.716628224693565,
      65.05823334708023
    ],
    [
      -22.712360733815014,
      65.05880017508946
    ],
    [
      -22.709251384185514,
      65.060416283291
    ],
    [
      -22.708097760413708,
      65.06172852475032
    ],
    [
      -22.706846121062846,
      65.06317480462323
    ],
[
      -22.705990350617462,
      65.06337160717314
    ],
    [
      -22.700769667670556,
      65.06553383086309
    ]
    ],
    "type": "LineString"
  }
}

function generateProjectList(title)	{

	initialList = document.getElementById('project-list').innerHTML

	let returnBtn = document.createElement('span');
	returnBtn.id = 'return-btn'
	returnBtn.innerHTML = '« back to projects'
	returnBtn.onclick = function()	{generateList()}
	document.getElementById('project-list').innerHTML = ''
	document.getElementById('project-list').appendChild(returnBtn);

	let subProjects = pagesDict[title]["sub-projects"];

	for (let i = 0; i < subProjects.length; i++)	{

		let subTitle = Object.keys(subProjects[i])[0];
		let bg = document.createElement('div');
		bg.classList.add('button-group')

		let b1 = document.createElement('span');
		b1.classList.add('button')
		b1.innerHTML = subTitle
		b1.onclick = function() {generateTargetPage(subTitle, false);} 
		bg.appendChild(b1)
		document.getElementById('project-list').appendChild(bg);

	}
	


}

function generateList()	{
		document.getElementById('project-list').innerHTML = ''
		for (let title in pagesDict){
		let bg = document.createElement('div');
		bg.classList.add('button-group')

		let b1 = document.createElement('span');
		b1.classList.add('button')
		b1.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>'
		b1.onclick = function() {generateTargetPage(title, false);} 
		bg.appendChild(b1)

		let b2 = document.createElement('span');
		b2.classList.add('button')
		b2.classList.add('button-split')
		b2.innerHTML = '<i class="fa fa-plane" aria-hidden="true"></i>'
		b2.onclick = function()	{animatePath(map,8000,path,0,2000000,0)};
		bg.appendChild(b2)

		let b3 = document.createElement('span');
		b3.classList.add('button')
		b3.classList.add('button-split')
		b3.classList.add('button-main')
		b3.innerHTML = title + '<i class="arrow right"></i>'
		b3.onclick = function() {generateProjectList(title);} 
		bg.appendChild(b3)



		
		if (title == "Þingvellir á Þórsnesi")	{
			//group = document.createElement('div');
			//group.classList.add('button-group')
			//div.classList.add('button-lead')
			//document.getElementById('project-list').appendChild(group)	
		}
		document.getElementById('project-list').appendChild(bg);
	}
}

