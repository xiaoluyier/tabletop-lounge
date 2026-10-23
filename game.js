(function(root){
'use strict';
const WORDS='月亮 医院 沙漠 钥匙 火山 蜜蜂 镜子 钢琴 海盗 电梯 雨伞 恐龙 城堡 火锅 邮票 冰箱 蝴蝶 铁路 珍珠 灯塔 企鹅 学校 咖啡 森林 赛车 雪人 警察 王冠 手机 魔术 竹子 闹钟 潜艇 蜘蛛 书店 骆驼 枕头 星星 机场 瀑布 气球 银行 烤箱 鲨鱼 剪刀 雕像 机器人 太阳 饺子 博物馆 吉他 马戏团 消防员 指南针 橄榄球 南瓜 窗户 蘑菇 望远镜 茶杯 章鱼 彩虹 石油 瀑布 沙发 手套 蛋糕 铅笔 龙卷风 车站 猫头鹰 奖杯 眼镜 电池 滑梯 蜡烛 宝石 轮船 火箭 螃蟹 足球 熊猫 胡椒 红绿灯 毛衣 袋鼠 相机 汉堡 雪山 稻田 池塘 象棋 天鹅 报纸 手术 雕塑 面具 法院 橡皮 月饼'.split(' ');
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const buf=new Uint32Array(1);crypto.getRandomValues(buf);const j=Math.floor(buf[0]/4294967296*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function code(){return shuffle([1,2,3,4]).slice(0,3).join('');}
function valid(v){return /^[1-4]{3}$/.test(v)&&new Set(v).size===3;}
function create(names){const w=shuffle([...new Set(WORDS)]);return {version:1,names,words:[w.slice(0,4),w.slice(4,8)],round:1,team:0,stage:'handoff',code:code(),hints:['','',''],history:[],intercepts:[0,0],errors:[0,0],winner:null};}
function judge(s,own,enemy){if(!valid(own)||(s.round>1&&!valid(enemy)))throw Error('请输入三个不重复的数字，只能使用 1、2、3、4。');const t=s.team;const hit=s.round>1&&enemy===s.code;const miss=own!==s.code;if(hit)s.intercepts[1-t]++;if(miss)s.errors[t]++;s.history.push({round:s.round,team:t,hints:[...s.hints],code:s.code,own,enemy:s.round>1?enemy:'首轮不截码',hit,miss});if(t===0){s.team=1;}else{const qualified=[0,1].map(i=>s.intercepts[i]>=2||s.errors[1-i]>=2);if(qualified[0]||qualified[1]||s.round>=8){const scores=[0,1].map(i=>s.intercepts[i]-s.errors[i]);s.winner=qualified[0]!==qualified[1]?(qualified[0]?0:1):scores[0]===scores[1]?'draw':scores[0]>scores[1]?0:1;s.stage='finished';return;}s.round++;s.team=0;}s.code=code();s.hints=['','',''];s.stage='handoff';}
const api={create,valid,judge,code};if(typeof module!=='undefined')module.exports=api;root.Game=api;
})(globalThis);
