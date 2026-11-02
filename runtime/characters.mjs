export const CHARACTERS={
 seoyeon:{name:'한서연',short:'서연',color:'#a43d68'},
 jiwoo:{name:'이지우',short:'지우',color:'#006e69'},
 haerin:{name:'윤해린',short:'해린',color:'#28578f'},
 yuna:{name:'정유나',short:'유나',color:'#944b25'},
 minseo:{name:'차민서',short:'민서',color:'#71509a'},
 doa:{name:'백도아',short:'도아',color:'#806018'},
 minjun:{name:'박민준',short:'민준',color:'#4d647a'},
 player:{name:'나',color:'#44515e'},narrator:{name:'나',color:'#745a67'}
};
export const characterColor=id=>CHARACTERS[id]?.color??'#745a67';
const aliases=Object.entries(CHARACTERS).flatMap(([id,c])=>c.short?[[c.name,id],[c.short,id]]:[]).sort((a,b)=>b[0].length-a[0].length);
const aliasMap=new Map(aliases),pattern=new RegExp(aliases.map(([name])=>name).join('|'),'g');
export function nameParts(text){
 const parts=[];let cursor=0;
 for(const match of text.matchAll(pattern)){
  const before=text.slice(0,match.index),after=text.slice(match.index+match[0].length);
  if(/[가-힣A-Za-z0-9]$/.test(before)||!(/^(?:$|[\s·,?!…:;()[\]“”"'—–]|은|는|이|가|을|를|의|에게|한테|와|과|도|만|랑|부터|으로|처럼|까지|께)/.test(after)))continue;
  if(match.index>cursor)parts.push({text:text.slice(cursor,match.index)});
  parts.push({text:match[0],character:aliasMap.get(match[0])});cursor=match.index+match[0].length;
 }
 if(cursor<text.length)parts.push({text:text.slice(cursor)});
 return parts.length?parts:[{text}];
}
export function paintName(element,id,text=CHARACTERS[id]?.name??id){element.textContent=text;element.className='character-name';element.dataset.character=id;element.style.setProperty('--name-color',characterColor(id));}
export function renderNamedText(element,text,{documentRef=globalThis.document,prefix}={}){
 const parts=nameParts(text),children=[];
 if(prefix&&CHARACTERS[prefix]&&!parts.some(p=>p.character===prefix)){
  const chip=documentRef.createElement('span');paintName(chip,prefix);chip.className+=' choice-person';children.push(chip);
 }
 for(const part of parts){if(!part.character){children.push(documentRef.createTextNode(part.text));continue;}const span=documentRef.createElement('span');paintName(span,part.character,part.text);children.push(span);}
 element.replaceChildren(...children);
}
