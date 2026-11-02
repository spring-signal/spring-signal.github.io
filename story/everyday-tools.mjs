import {node} from './weekly-plans.mjs?v=200';
import {wardrobeFor} from '../runtime/wardrobe.mjs?v=200';
export const has=(key,value=true)=>({flag:key,value}),flag=(key,value=true)=>({type:'flag',key,value});
export const all=(...rules)=>({all:rules}),any=(...rules)=>({any:rules}),not=rule=>({not:rule}),exists=key=>({flag:key});
export const exp=id=>({type:'experience',id}),msg=(id,character,text,direction='in',when)=>({type:'message',id,character,text,direction,when});
export const retarget=(v,a,b)=>typeof v==='string'?(v===a?b:v):v?.map(x=>({...x,node:x.node===a?b:x.node}));
export function weaver(base){
 const map=new Map(structuredClone(base.nodes).map(n=>[n.id,n]));
 const get=id=>{const n=map.get(id);if(!n)throw Error('Missing scene '+id);return n;};
 const make=(id,label,w,day,bg,cast,lines,next,extra={})=>{const locations={'bg.home_day':'home','bg.bookshop_day':'bookshop','bg.city_gallery_day':'city-gallery','bg.market_day':'market','bg.river_day':'river'};const n=node(id,label,w,day,bg,cast,lines,next,{...(locations[bg]?{location:locations[bg]}:{}),...(bg==='bg.river_day'?{timeOfDay:'dusk'}:{}),...extra});n.season=w>=17?'summer':w>=9?'earlySummer':n.season;n.wardrobeRevision='0.9.0';n.outfits=wardrobeFor(n);map.set(id,n);return n;};
 return {map,get,make,finish:(extra={})=>({...base,...extra,nodes:[...map.values()]})};
}
