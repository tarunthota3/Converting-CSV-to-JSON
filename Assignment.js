const fs = require('fs');
let input=fs.createReadStream('Indicators.csv');

let rl=require('readline').createInterface({
	input:input,
	terminal:false
});
let arr=[];
let arr2=[];
let arr3=[];
let rural;
let rural1=[0,0,0,0,0];
let urban1=[0,0,0,0,0];
let country=['INDIA','CHINA','NEPAL','PAKISTAN','BHUTAN'];
let temp;
rl.on('line',function(line){
	let arr1 = line.split(',');
	let obj={};
	let obj1={};
	let obj2={};
	if(arr1[1] == 'IND' && (arr1[4] >= 1960 && arr1[4] <= 2015) && arr1[3] == 'SP.RUR.TOTL.ZS') {
		rural=arr1[5];
		
	}
	if(arr1[1] == 'IND' && (arr1[4] >= 1960 && arr1[4] <= 2015) && arr1[3] == 'SP.URB.TOTL.IN.ZS') {
		obj['year'] = arr1[4];

		obj['Rural population (% of total population)'] = rural;
		obj['Urban population (% of total)'] = arr1[5];
		arr.push(obj);
	}
	
	if(arr1[1] == 'IND' && arr1[3] == 'SP.URB.GROW') {
		obj1['year'] = arr1[4];
		obj1['Urban population growth (annual %)'] = arr1[5];
		arr2.push(obj1);
	}

	if((arr1[1] == 'IND') && arr1[3] == 'SP.RUR.TOTL') {
		rural1[0]=rural1[0]+parseInt(arr1[5]);
	}	
	if(arr1[1] == 'IND' && arr1[3] == 'SP.URB.TOTL') {
		urban1[0]=urban1[0]+parseInt(arr1[5]);
	}

	if((arr1[1] == 'CHN') && arr1[4] == 1960 && arr1[3] == 'SP.RUR.TOTL') {
		rural1[1]=rural1[1]+parseInt(arr1[5]);
	}	
	if(arr1[1] == 'CHN' && arr1[4] == 1960 && arr1[3] == 'SP.URB.TOTL') {
		urban1[1]=urban1[1]+parseInt(arr1[5]);
	}

	if((arr1[1] == 'NPL') && arr1[4] == 1960 && arr1[3] == 'SP.RUR.TOTL') {
		rural1[2]=rural1[2]+parseInt(arr1[5]);
	}	
	if(arr1[1] == 'NPL' && arr1[4] == 1960 && arr1[3] == 'SP.URB.TOTL') {
		urban1[2]=urban1[2]+parseInt(arr1[5]);
	}

	if((arr1[1] == 'PAK') && arr1[4] == 1960 && arr1[3] == 'SP.RUR.TOTL') {
		rural1[3]=rural1[3]+parseInt(arr1[5]);
	}	
	if(arr1[1] == 'PAK' && arr1[4] == 1960 && arr1[3] == 'SP.URB.TOTL') {
		urban1[3]=urban1[3]+parseInt(arr1[5]);
	}

	if((arr1[1] == 'BTN') && arr1[4] == 1960 && arr1[3] == 'SP.RUR.TOTL') {
		rural1[4]=rural1[4]+parseInt(arr1[5]);
	}	
	if(arr1[1] == 'BTN' && arr1[4] == 1960 && arr1[3] == 'SP.URB.TOTL') {
		urban1[4]=urban1[4]+parseInt(arr1[5]);
	}

});
rl.on('close',function(){
	fs.writeFile('linechart.json',JSON.stringify(arr));
	fs.writeFile('areachart.json',JSON.stringify(arr2));
	for(let j=0;j<country.length;j++) {
		arr3.push({'country': country[j],'rural':rural1[j],'urban':urban1[j]});
	}

	for(let i=0; i<arr3.length; i++) {
		for(let j=0; j<arr3.length-1; j++) {
			if((arr3[j].rural + arr3[j].urban) < (arr3[j+1].rural + arr3[j+1].urban)){
				temp=arr3[j];
				arr3[j]=arr3[j+1];
				arr3[j+1]=temp;
			}
		}
	}
	fs.writeFile('stackedbarchart.json',JSON.stringify(arr3));
});
