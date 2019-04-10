(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a(59)},25:function(e,t,a){},39:function(e,t,a){},41:function(e,t,a){},45:function(e,t,a){},48:function(e,t,a){},55:function(e,t,a){},57:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(10),r=a.n(l),i=(a(25),a(2)),c=a(3),s=a(5),m=a(4),u=a(6),d=a(1),v=a(11),p=a.n(v),g=(a(39),function(e){var t=e.value,a=e.onSelect;return o.a.createElement("div",{className:"menu-item",key:t,onClick:a(t)},t)});g.defaultProps={};var E=g,h=(a(41),function(e){var t=e.menuItems,a=e.onSelect;return o.a.createElement("div",{className:"menu-page"},t.map(function(e){return o.a.createElement(E,{key:e,value:e,onSelect:a})}))});h.defaultProps={};var b=h,f=a(19),N=null,C=[],y=function(e,t){C=C.concat([{name:e,keyData:t}])},k=function(e,t,a,n){C.forEach(function(t){e.objectStoreNames.contains(t.name)||(console.log("Adding datastore: ",t.name),e.createObjectStore(t.name,t.keyData))})},O=function(e){return N};y("monsters",{keyPath:"id"});var j=function(e){return O().put("monsters",e)},x=function(e){return O().delete("monsters",e)},A=function(e){return e.id=e.name+e.xp,e};y("monster-images",{autoIncrement:!0});var w=function(e){return S(function(e){return Math.floor((e-10)/2)}(e))},S=function(e){var t=e.toString();return t.indexOf("-")<0&&(t="+".concat(t)),t},M=function(e){return R[e]},R={0:"0",25:"1/8",50:"1/4",100:"1/2",200:"1",450:"2",700:"3",1100:"4",1800:"5",2300:"6",2900:"7",3900:"8",5000:"9",5900:"10",7200:"11",8400:"12",10000:"13",11500:"14",13000:"15",15000:"16",18000:"17",20000:"18",22000:"19",25000:"20",33000:"21",41000:"22",50000:"23",62000:"24",75000:"25",90000:"26",105000:"27",120000:"28",135000:"29",155000:"30"},P=function(e){var t=e.onChange,a=e.value,n=e.showSelect;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"",disabled:!n,hidden:!n},"Select CR"),Object.keys(R).map(function(e){return o.a.createElement("option",{key:e,value:e},"".concat(R[e]," (").concat(e," exp)"))}))};P.defaultProps={showSelect:!1};var I=P,D=(a(45),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={monsterList:[],loading:!0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onAddMonster,a=e.filterXp,n=e.onXPFilter,l=e.onNameFilter,r=e.filterName;return o.a.createElement("div",{className:"monster-viewer-header"},o.a.createElement("div",{className:"mvh-row"},o.a.createElement("input",{placeholder:"Filter By Monster Name",type:"search",value:r||"",onChange:l}),o.a.createElement("div",{className:"mvh-left-margin"},o.a.createElement(I,{value:null==a?"":a.toString(),onChange:n,showSelect:!0}))),o.a.createElement("button",{onClick:t},"Add Monster"))}}]),t}(n.Component));D.defaultProps={filterXp:null,filterName:null};var L=D,F=a(7),z=(a(48),function(e){var t=e.show,a=e.children,n=t?"modal display-block":"modal display-none";return o.a.createElement("div",{className:n},o.a.createElement("section",{className:"modal-main"},a))}),T=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Size"),o.a.createElement("option",{value:"Tiny"},"Tiny"),o.a.createElement("option",{value:"Small"},"Small"),o.a.createElement("option",{value:"Medium"},"Medium"),o.a.createElement("option",{value:"Large"},"Large"),o.a.createElement("option",{value:"Huge"},"Huge"),o.a.createElement("option",{value:"Gargantuan"},"Gargantuan"))};T.defaultProps={value:"None"};var U=T,H=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Monster Type"),o.a.createElement("option",{value:"Aberration"},"Aberration"),o.a.createElement("option",{value:"Beast"},"Beast"),o.a.createElement("option",{value:"Celestial"},"Celestial"),o.a.createElement("option",{value:"Construct"},"Construct"),o.a.createElement("option",{value:"Dragon"},"Dragon"),o.a.createElement("option",{value:"Elemental"},"Elemental"),o.a.createElement("option",{value:"Fey"},"Fey"),o.a.createElement("option",{value:"Fiend"},"Fiend"),o.a.createElement("option",{value:"Giant"},"Giant"),o.a.createElement("option",{value:"Humanoid"},"Humanoid"),o.a.createElement("option",{value:"Monstrosity"},"Monstrosity"),o.a.createElement("option",{value:"Ooze"},"Ooze"),o.a.createElement("option",{value:"Plant"},"Plant"),o.a.createElement("option",{value:"Undead"},"Undead"))};H.defaultProps={value:"None"};var X=H,G=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Alignment"),o.a.createElement("option",{value:"Unaligned"},"Unaligned"),o.a.createElement("option",{value:"Lawful Good"},"Lawful Good"),o.a.createElement("option",{value:"Neutral Good"},"Neutral Good"),o.a.createElement("option",{value:"Chaotic Good"},"Chaotic Good"),o.a.createElement("option",{value:"Lawful Neutral"},"Lawful Neutral"),o.a.createElement("option",{value:"True Neutral"},"True Neutral"),o.a.createElement("option",{value:"Chaotic Neutral"},"Chaotic Neutral"),o.a.createElement("option",{value:"Lawful Evil"},"Lawful Evil"),o.a.createElement("option",{value:"Neutral Evil"},"Neutral Evil"),o.a.createElement("option",{value:"Chaotic Evil"},"Chaotic Evil"))};G.defaultProps={value:"None"};var V=G,B=(a(8),function(e){var t=e.onChange,a=e.monster;return e.editable?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("input",{type:"text",placeholder:"Monster Name",onChange:t("name"),value:a.name||""}),o.a.createElement("div",{className:"monster-form-row-section"},o.a.createElement(U,{value:a.size||"None",onChange:t("size")}),o.a.createElement("div",{className:"left-margin"},o.a.createElement(X,{value:a.type||"None",onChange:t("type")})),o.a.createElement("div",{className:"left-margin"},o.a.createElement(V,{value:a.alignment||"None",onChange:t("alignment")})))):o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("span",{className:"red-text bold-text"},a.name),o.a.createElement("span",null,"".concat(a.size," ").concat(a.type,", ").concat(a.alignment)))});B.defaultProps={};var W=B,K=function(e){var t=e.onChangeNumber,a=e.monster;return e.editable?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("input",{className:"top-margin",type:"number",placeholder:"AC",onChange:t("ac"),value:a.ac||""}),o.a.createElement("input",{className:"top-margin",type:"number",placeholder:"HP",onChange:t("hp"),value:a.hp||""}),o.a.createElement("input",{className:"top-margin",type:"number",placeholder:"Speed (ft)",onChange:t("speed"),value:a.speed||""})):o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container"},o.a.createElement("span",{className:"red-text bold-text"},"Armor Class:\xa0"),o.a.createElement("span",{className:"red-text"},a.ac)),o.a.createElement("div",{className:"row-container"},o.a.createElement("span",{className:"red-text bold-text"},"Hit Points:\xa0"),o.a.createElement("span",{className:"red-text"},a.hp)),o.a.createElement("div",{className:"row-container"},o.a.createElement("span",{className:"red-text bold-text"},"Speed:\xa0"),o.a.createElement("span",{className:"red-text"},a.speed," ft.")))};K.defaultProps={};var J=K,$=function(e){var t=e.onChangeNumber,a=e.monster;return e.editable?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container center-container"},o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"STR",onChange:t("stats.str"),value:a.stats.str||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.str))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"DEX",onChange:t("stats.dex"),value:a.stats.dex||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.dex))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"CON",onChange:t("stats.con"),value:a.stats.con||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.con))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"INT",onChange:t("stats.int"),value:a.stats.int||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.int))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"WIS",onChange:t("stats.wis"),value:a.stats.wis||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.wis))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("input",{className:"number-size",type:"number",placeholder:"CHA",onChange:t("stats.cha"),value:a.stats.cha||""}),o.a.createElement("div",{className:"left-margin"},w(a.stats.cha))))):o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container center-container"},o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"STR"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.str," (").concat(w(a.stats.str),")"))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"DEX"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.dex," (").concat(w(a.stats.dex),")"))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"CON"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.con," (").concat(w(a.stats.con),")"))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"INT"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.int," (").concat(w(a.stats.int),")"))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"WIS"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.wis," (").concat(w(a.stats.wis),")"))),o.a.createElement("div",{className:"col-continer center-container side-margin"},o.a.createElement("div",{className:"red-text bold-text"},"CHA"),o.a.createElement("div",{className:"red-text"},"".concat(a.stats.cha," (").concat(w(a.stats.cha),")")))))};$.defaultProps={};var q=$,Q=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Skill"),o.a.createElement("option",{value:"Acrobatics"},"Acrobatics"),o.a.createElement("option",{value:"Animal Handling"},"Animal Handling"),o.a.createElement("option",{value:"Arcana"},"Arcana"),o.a.createElement("option",{value:"Athletics"},"Athletics"),o.a.createElement("option",{value:"Deception"},"Deception"),o.a.createElement("option",{value:"History"},"History"),o.a.createElement("option",{value:"Insight"},"Insight"),o.a.createElement("option",{value:"Intimidation"},"Intimidation"),o.a.createElement("option",{value:"Investigation"},"Investigation"),o.a.createElement("option",{value:"Medicine"},"Medicine"),o.a.createElement("option",{value:"Nature"},"Nature"),o.a.createElement("option",{value:"Perception"},"Perception"),o.a.createElement("option",{value:"Performance"},"Performance"),o.a.createElement("option",{value:"Persuasion"},"Persuasion"),o.a.createElement("option",{value:"Religion"},"Religion"),o.a.createElement("option",{value:"Sleight of Hand"},"Sleight of Hand"),o.a.createElement("option",{value:"Stealth"},"Stealth"),o.a.createElement("option",{value:"Survival"},"Survival"))};Q.defaultProps={value:"None"};var Y=Q,Z=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Damage Type"),o.a.createElement("option",{value:"Acid"},"Acid"),o.a.createElement("option",{value:"Bludgeoning"},"Bludgeoning"),o.a.createElement("option",{value:"Cold"},"Cold"),o.a.createElement("option",{value:"Fire"},"Fire"),o.a.createElement("option",{value:"Force"},"Force"),o.a.createElement("option",{value:"Lightning"},"Lightning"),o.a.createElement("option",{value:"Necrotic"},"Necrotic"),o.a.createElement("option",{value:"Piercing"},"Piercing"),o.a.createElement("option",{value:"Poison"},"Poison"),o.a.createElement("option",{value:"Psychic"},"Psychic"),o.a.createElement("option",{value:"Radiant"},"Radiant"),o.a.createElement("option",{value:"Slashing"},"Slashing"),o.a.createElement("option",{value:"Thunder"},"Thunder"))};Z.defaultProps={value:"None"};var _=Z,ee=function(e){var t=e.onChange,a=e.value;return o.a.createElement("select",{value:a,onChange:t},o.a.createElement("option",{value:"None",disabled:!0,hidden:!0},"Select Condition"),o.a.createElement("option",{value:"Blinded"},"Blinded"),o.a.createElement("option",{value:"Charmed"},"Charmed"),o.a.createElement("option",{value:"Deafened"},"Deafened"),o.a.createElement("option",{value:"Fatigued"},"Fatigued"),o.a.createElement("option",{value:"Frightened"},"Frightened"),o.a.createElement("option",{value:"Grappled"},"Grappled"),o.a.createElement("option",{value:"Incapacitated"},"Incapacitated"),o.a.createElement("option",{value:"Invisible"},"Invisible"),o.a.createElement("option",{value:"Paralyzed"},"Paralyzed"),o.a.createElement("option",{value:"Petrified"},"Petrified"),o.a.createElement("option",{value:"Poisoned"},"Poisoned"),o.a.createElement("option",{value:"Prone"},"Prone"),o.a.createElement("option",{value:"Restrained"},"Restrained"),o.a.createElement("option",{value:"Stunned"},"Stunned"),o.a.createElement("option",{value:"Unconscious"},"Unconscious"),o.a.createElement("option",{value:"Exhaustion"},"Exhaustion"))};ee.defaultProps={value:"None"};var te=ee,ae=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a.onRemoveElement=a.onRemoveElement.bind(Object(d.a)(Object(d.a)(a))),a.onAddElement=a.onAddElement.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onRemoveElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].filter(function(e,a){return a!==t});a.props.onChange(e)({target:{value:o}})}}},{key:"onAddElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].concat([t]);a.props.onChange(e)({target:{value:o}})}}},{key:"render",value:function(){var e=this,t=this.props,a=t.editable,n=t.monster,l=t.onChange,r=t.onChangeNumber;return a?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"column-continer"},o.a.createElement("div",{className:"row-container"},"Skills ",o.a.createElement("button",{onClick:this.onAddElement("skills",{skill:"None",modifier:0}),className:"left-margin"},"Add Skill")),n.skills.map(function(t,a){return o.a.createElement("div",{className:"row-container top-margin",key:a},o.a.createElement(Y,{value:t.skill,onChange:l("skills.".concat(a,".skill"))}),o.a.createElement("input",{className:"left-margin number-size",type:"number",value:t.modifier,onChange:r("skills.".concat(a,".modifier"))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("skills",a)},"Delete"))})),o.a.createElement("div",{className:"column-continer top-margin"},o.a.createElement("div",{className:"row-container"},"Damage Vulnerabilities ",o.a.createElement("button",{onClick:this.onAddElement("damageVulnerabilities","None"),className:"left-margin"},"Add Vulnerability")),n.damageVulnerabilities.map(function(t,a){return o.a.createElement("div",{className:"row-container top-margin",key:a},o.a.createElement(_,{value:t,onChange:l("damageVulnerabilities.".concat(a))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("damageVulnerabilities",a)},"Delete"))})),o.a.createElement("div",{className:"column-continer top-margin"},o.a.createElement("div",{className:"row-container"},"Damage Resistances ",o.a.createElement("button",{onClick:this.onAddElement("damageResistances","None"),className:"left-margin"},"Add Resistance")),n.damageResistances.map(function(t,a){return o.a.createElement("div",{className:"row-container top-margin",key:a},o.a.createElement(_,{value:t,onChange:l("damageResistances.".concat(a))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("damageResistances",a)},"Delete"))})),o.a.createElement("div",{className:"column-continer top-margin"},o.a.createElement("div",{className:"row-container"},"Damage Immunities ",o.a.createElement("button",{onClick:this.onAddElement("damageImmunities","None"),className:"left-margin"},"Add Immunity")),n.damageImmunities.map(function(t,a){return o.a.createElement("div",{className:"row-container top-margin",key:a},o.a.createElement(_,{value:t,onChange:l("damageImmunities.".concat(a))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("damageImmunities",a)},"Delete"))})),o.a.createElement("div",{className:"column-continer top-margin"},o.a.createElement("div",{className:"row-container"},"Condition Immunities ",o.a.createElement("button",{onClick:this.onAddElement("conditionImmunities","None"),className:"left-margin"},"Add Immunity")),n.conditionImmunities.map(function(t,a){return o.a.createElement("div",{className:"row-container top-margin",key:a},o.a.createElement(te,{value:t,onChange:l("conditionImmunities.".concat(a))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("conditionImmunities",a)},"Delete"))})),o.a.createElement("textarea",{className:"top-margin textarea-size",value:n.senses,onChange:l("senses"),placeholder:"Senses"}),o.a.createElement("textarea",{className:"top-margin textarea-size",value:n.languages,onChange:l("languages"),placeholder:"Languages"}),o.a.createElement("div",{className:"row-container top-margin"},"CR:",o.a.createElement("div",{className:"left-margin"},o.a.createElement(I,{value:n.xp.toString(),onChange:r("xp")})))):o.a.createElement("div",{className:"monster-form-section border-bottom"},0!==n.skills.length&&o.a.createElement("div",{className:"row-container mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Skills\xa0"),o.a.createElement("span",{className:"red-text"},n.skills.map(function(e,t){return"".concat(0===t?"":", ").concat(e.skill," ").concat(S(e.modifier))}))),0!==n.damageVulnerabilities.length&&o.a.createElement("div",{className:"row-container mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Damage Vulnerabilities\xa0"),o.a.createElement("span",{className:"red-text"},n.damageVulnerabilities.map(function(e,t){return"".concat(0===t?"":", ").concat(e)}))),0!==n.damageResistances.length&&o.a.createElement("div",{className:"row-container mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Damage Resistances\xa0"),o.a.createElement("span",{className:"red-text"},n.damageResistances.map(function(e,t){return"".concat(0===t?"":", ").concat(e)}))),0!==n.damageImmunities.length&&o.a.createElement("div",{className:"row-container mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Damage Immunities\xa0"),o.a.createElement("span",{className:"red-text"},n.damageImmunities.map(function(e,t){return"".concat(0===t?"":", ").concat(e)}))),0!==n.conditionImmunities.length&&o.a.createElement("div",{className:"row-container mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Condition Immunities\xa0"),o.a.createElement("span",{className:"red-text"},n.conditionImmunities.map(function(e,t){return"".concat(0===t?"":", ").concat(e)}))),""!==n.senses&&null!=n.senses&&o.a.createElement("div",{className:"mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Senses\xa0"),o.a.createElement("span",{className:"red-text"},n.senses)),""!==n.languages&&null!=n.languages&&o.a.createElement("div",{className:"mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Languages\xa0"),o.a.createElement("span",{className:"red-text"},n.languages)),o.a.createElement("div",{className:"mm-align-left"},o.a.createElement("span",{className:"red-text bold-text"},"Challenge\xa0"),o.a.createElement("span",{className:"red-text"},"".concat(M(n.xp)," (").concat(n.xp," XP)"))))}}]),t}(n.Component);ae.defaultProps={};var ne=ae,oe=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a.onRemoveElement=a.onRemoveElement.bind(Object(d.a)(Object(d.a)(a))),a.onAddElement=a.onAddElement.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onRemoveElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].filter(function(e,a){return a!==t});a.props.onChange(e)({target:{value:o}})}}},{key:"onAddElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].concat([t]);a.props.onChange(e)({target:{value:o}})}}},{key:"render",value:function(){var e=this,t=this.props,a=t.editable,n=t.monster,l=t.onChange;return a?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container"},"Abilities: ",o.a.createElement("button",{className:"left-margin",onClick:this.onAddElement("abilities",{name:"",descr:""})},"Add Ability")),n.abilities.map(function(t,a){return o.a.createElement("div",{key:a,className:"row-container top-margin"},o.a.createElement("input",{type:"text",placeholder:"Ability Name",value:t.name,onChange:l("abilities.".concat(a,".name"))}),o.a.createElement("textarea",{className:"left-margin textarea-size",placeholder:"Ability Description",value:t.descr,onChange:l("abilities.".concat(a,".descr"))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("abilities",a)},"Delete"))})):0===n.abilities.length?(console.log("No abilities"),null):o.a.createElement("div",{className:"monster-form-section border-bottom mm-align-left"},n.abilities.map(function(e,t){return o.a.createElement("div",{key:t},o.a.createElement("span",{className:"bold-text"},e.name,"\xa0"),o.a.createElement("span",null,e.descr))}))}}]),t}(n.Component);oe.defaultProps={};var le=oe,re=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a.onRemoveElement=a.onRemoveElement.bind(Object(d.a)(Object(d.a)(a))),a.onAddElement=a.onAddElement.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onRemoveElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].filter(function(e,a){return a!==t});a.props.onChange(e)({target:{value:o}})}}},{key:"onAddElement",value:function(e,t){var a=this;return function(n){var o=a.props.monster[e].concat([t]);a.props.onChange(e)({target:{value:o}})}}},{key:"render",value:function(){var e=this,t=this.props,a=t.editable,n=t.monster,l=t.onChange;return a?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container"},"Actions: ",o.a.createElement("button",{className:"left-margin",onClick:this.onAddElement("actions",{name:"",descr:""})},"Add Action")),n.actions.map(function(t,a){return o.a.createElement("div",{key:a,className:"row-container top-margin"},o.a.createElement("input",{type:"text",placeholder:"Action Name",value:t.name,onChange:l("actions.".concat(a,".name"))}),o.a.createElement("textarea",{className:"left-margin textarea-size",placeholder:"Action Description",value:t.descr,onChange:l("actions.".concat(a,".descr"))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("actions",a)},"Delete"))})):0===n.actions.length?null:o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"red-text bold-text"},"Actions"),n.actions.map(function(e,t){return o.a.createElement("div",{className:"top-margin mm-align-left",key:t},o.a.createElement("span",{className:"bold-text"},e.name,"\xa0"),o.a.createElement("span",null,e.descr))}))}}]),t}(n.Component);re.defaultProps={};var ie=re,ce=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={},a.onRemoveElement=a.onRemoveElement.bind(Object(d.a)(Object(d.a)(a))),a.onAddElement=a.onAddElement.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onRemoveElement",value:function(e,t){var a=this;return function(n){var o=Object(F.property)(e.split("."))(a.props.monster).filter(function(e,a){return a!==t});a.props.onChange(e)({target:{value:o}})}}},{key:"onAddElement",value:function(e,t){var a=this;return function(n){var o=Object(F.property)(e.split("."))(a.props.monster).concat([t]);a.props.onChange(e)({target:{value:o}})}}},{key:"render",value:function(){var e=this,t=this.props,a=t.editable,n=t.monster,l=t.onChange;return console.log(n.legendaryActions),a?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"row-container"},"Legendary Actions: ",o.a.createElement("button",{className:"left-margin",onClick:this.onAddElement("legendaryActions.actions",{name:"",descr:""})},"Add Action")),o.a.createElement("textarea",{className:"top-margin textarea-size",placeholder:"Legendary Action Summary and Restrictions",onChange:l("legendaryActions.summary"),value:n.legendaryActions.summary}),n.legendaryActions.actions.map(function(t,a){return o.a.createElement("div",{key:a,className:"row-container top-margin"},o.a.createElement("input",{placeholder:"Action Name",type:"text",value:t.name,onChange:l("legendaryActions.actions.".concat(a,".name"))}),o.a.createElement("textarea",{className:"left-margin textarea-size",placeholder:"Action Description",value:t.descr,onChange:l("legendaryActions.actions.".concat(a,".descr"))}),o.a.createElement("button",{className:"left-margin",onClick:e.onRemoveElement("legendaryActions.actions",a)},"Delete"))})):0===n.legendaryActions.actions.length?null:o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",{className:"red-text bold-text"},"Legendary Actions"),o.a.createElement("div",null,n.legendaryActions.summary),n.legendaryActions.actions.map(function(e,t){return o.a.createElement("div",{className:"top-margin mm-align-left",key:t},o.a.createElement("span",{className:"bold-text"},e.name,"\xa0"),o.a.createElement("span",null,e.descr))}))}}]),t}(n.Component);ce.defaultProps={};var se=ce,me=a(18),ue=a.n(me),de=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={pictureURL:null,loadingImage:!1},a.onDrop=a.onDrop.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e,t=this,a=this.props.monster;null!=a.imageKey&&((e=a.imageKey,O().get("monster-images",e)).then(function(e){t.setState({pictureURL:e})}).catch(function(e){a.imageKey=null}),this.setState({loadingImage:!0}))}},{key:"onDrop",value:function(e){var t=this,a=new FileReader;a.onload=function(e){t.props.onImageSet(a.result),t.setState({pictureURL:a.result,loadingImage:!1})},a.readAsDataURL(e[0]),this.setState({loadingImage:!0})}},{key:"render",value:function(){var e=this.state,t=e.loadingImage,a=e.pictureURL;return t||null!=a?o.a.createElement("div",{className:"row-container center-container"},o.a.createElement("img",{style:{maxHeight:"20em"},alt:"Loading...",src:a})):o.a.createElement(ue.a,{withIcon:!0,buttonText:"Choose images",onChange:this.onDrop,imgExtension:[".jpg",".jpeg",".gif",".png",".gif"],maxFileSize:5242880})}}]),t}(n.Component);de.defaultProps={onImageSet:F.noop};var ve=de,pe=function(e){var t=e.onChange,a=e.monster;return e.editable?o.a.createElement("div",{className:"monster-form-section border-bottom"},o.a.createElement("div",null,"Description:"),o.a.createElement("textarea",{className:"textarea-size top-margin",onChange:t("description"),value:a.description})):o.a.createElement("div",{className:"monster-form-section border-bottom mm-align-left"},o.a.createElement("span",null,a.description))};pe.defaultProps={};var ge=pe,Ee=function(e,t,a){for(var n=t.split("."),o=e,l=0;l<n.length;l++){var r=n[l];l===n.length-1?o[r]=a:(null==o[r]&&(o[r]={}),o=o[r])}},he=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).onChange=a.onChange.bind(Object(d.a)(Object(d.a)(a))),a.onChangeNumber=a.onChangeNumber.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onChange",value:function(e){var t=this,a=this.props.monster;return function(n){var o=n.target.value,l=Object(F.clone)(a);Ee(l,e,o),t.props.onMonsterChange(l)}}},{key:"onChangeNumber",value:function(e){var t=this,a=this.props.monster;return function(n){var o=parseInt(n.target.value),l=Object(F.clone)(a);Ee(l,e,o),t.props.onMonsterChange(l)}}},{key:"render",value:function(){var e=this.props,t=e.editable,a=e.show,n=e.monster,l=e.onSave,r=e.onCancel,i=e.onDelete,c=e.onImageSet,s=e.onToggleEdit;return null==n?null:o.a.createElement(z,{show:a},o.a.createElement("div",{className:"monster-form"},o.a.createElement(W,{editable:t,monster:n,onChange:this.onChange}),o.a.createElement(J,{editable:t,monster:n,onChangeNumber:this.onChangeNumber}),o.a.createElement(q,{editable:t,monster:n,onChangeNumber:this.onChangeNumber}),o.a.createElement(ne,{editable:t,monster:n,onChange:this.onChange,onChangeNumber:this.onChangeNumber}),o.a.createElement(le,{editable:t,monster:n,onChange:this.onChange}),o.a.createElement(ie,{editable:t,monster:n,onChange:this.onChange}),o.a.createElement(se,{editable:t,monster:n,onChange:this.onChange}),o.a.createElement(ge,{editable:t,monster:n,onChange:this.onChange}),o.a.createElement("div",{className:"monster-form-section"},o.a.createElement(ve,{monster:n,onImageSet:c})),t?o.a.createElement("div",{className:"row-container-space-between top-margin"},o.a.createElement("button",{onClick:l},"Save"),null!=n.id&&o.a.createElement("button",{onClick:i},"Delete"),o.a.createElement("button",{onClick:r},"Cancel")):o.a.createElement("div",{className:"row-container-space-between top-margin"},s!==F.noop&&o.a.createElement("button",{onClick:s},"Edit"),o.a.createElement("button",{onClick:r},"Close"))))}}]),t}(n.Component);he.defaultProps={monster:null,editable:!1,onMonsterChange:F.noop,onDelete:F.noop,onImageSet:F.noop,onToggleEdit:F.noop};var be=he,fe=(a(55),function(e){return e.sort(function(e,t){var a=e.id.toUpperCase(),n=t.id.toUpperCase();return a<n?-1:a>n?1:0})}),Ne=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={monsterList:[],loading:!0,selectedMonster:null,imageURL:null,filterXp:null,filterName:null,editing:!1},a.onAddMonster=a.onAddMonster.bind(Object(d.a)(Object(d.a)(a))),a.onImageSet=a.onImageSet.bind(Object(d.a)(Object(d.a)(a))),a.onMonsterChange=a.onMonsterChange.bind(Object(d.a)(Object(d.a)(a))),a.changeMonster=a.changeMonster.bind(Object(d.a)(Object(d.a)(a))),a.onDeleteMonster=a.onDeleteMonster.bind(Object(d.a)(Object(d.a)(a))),a.saveMonsterModel=a.saveMonsterModel.bind(Object(d.a)(Object(d.a)(a))),a.cancelMonsterModal=a.cancelMonsterModal.bind(Object(d.a)(Object(d.a)(a))),a.changeXPFilter=a.changeXPFilter.bind(Object(d.a)(Object(d.a)(a))),a.changeNameFilter=a.changeNameFilter.bind(Object(d.a)(Object(d.a)(a))),a.onToggleEdit=a.onToggleEdit.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onAddMonster",value:function(){this.setState({selectedMonster:{name:"",size:"None",type:"None",alignment:"None",stats:{str:0,dex:0,con:0,int:0,wis:0,cha:0},skills:[],xp:0,ac:0,hp:0,speed:0,damageVulnerabilities:[],damageImmunities:[],damageResistances:[],conditionImmunities:[],senses:"",languages:"",actions:[],abilities:[],legendaryActions:{summary:"",actions:[]},description:"",imageKey:null},imageURL:null,editing:!0})}},{key:"onImageSet",value:function(e){this.setState({imageURL:e})}},{key:"onToggleEdit",value:function(){this.setState({editing:!0})}},{key:"onMonsterChange",value:function(e){this.setState({selectedMonster:e})}},{key:"changeMonster",value:function(e){var t=this;return function(a){return t.onMonsterChange(e)}}},{key:"cancelMonsterModal",value:function(){this.setState({selectedMonster:null,imageURL:null,editing:!1})}},{key:"onDeleteMonster",value:function(){var e,t=this.state.selectedMonster,a=this.state.monsterList;a=a.filter(function(e){return e.id!==t.id}),t.imageKey&&(e=t.imageKey,O().delete("monster-images",e)),x(t.id),this.setState({selectedMonster:null,monsterList:fe(a),imageURL:null,editing:!1})}},{key:"saveMonsterModel",value:function(){var e,t=this.state.selectedMonster,a=this.state,n=a.monsterList,o=a.imageURL;if(null==t.id)A(t),n=n.concat([t]),o?(console.log("saving image"),(e=o,O().put("monster-images",e)).then(function(e){console.log("id",e),t.imageKey=e,j(t)})):j(t);else{var l=t.id;n=n.filter(function(e){return e.id!==t.id}),A(t),n=n.concat([t]),x(l).then(function(e){return j(t)})}this.setState({selectedMonster:null,monsterList:fe(n),imageURL:null,editing:!1})}},{key:"componentDidMount",value:function(e){var t=this;O().getAll("monsters").then(function(e){t.setState({monsterList:fe(e),loading:!1})}).catch(function(e){console.error(e)})}},{key:"changeNameFilter",value:function(e){var t=e.target.value;this.setState({filterName:t})}},{key:"changeXPFilter",value:function(e){var t=e.target.value;this.setState({filterXp:""===t?null:parseInt(t)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.monsterList,n=(t.loading,t.selectedMonster),l=t.filterName,r=t.filterXp,i=t.editing,c=null!=n,s=null==l||""===l?null:l.toUpperCase();return o.a.createElement("div",{className:"mv-view"},o.a.createElement(L,{filterXp:r,filterName:l,onAddMonster:this.onAddMonster,onNameFilter:this.changeNameFilter,onXPFilter:this.changeXPFilter}),o.a.createElement(be,{monster:n,show:c,onSave:this.saveMonsterModel,onCancel:this.cancelMonsterModal,onMonsterChange:this.onMonsterChange,onImageSet:this.onImageSet,onDelete:this.onDeleteMonster,editable:i,onToggleEdit:this.onToggleEdit}),a.filter(function(e){var t=null==s||e.name.toUpperCase().indexOf(s)>=0;return(null==r||e.xp===r)&&t}).map(function(t){return o.a.createElement("div",{className:"mv-monster",key:t.id,onClick:e.changeMonster(t)},"".concat(t.name," CR ").concat(M(t.xp)))}))}}]),t}(n.Component),Ce={"Monster Viewer":o.a.createElement(Ne,null)},ye=(a(57),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={currentLocation:null,databaseLoaded:!1},a.getDisplayElement=a.getDisplayElement.bind(Object(d.a)(Object(d.a)(a))),a.backToRootMenu=a.backToRootMenu.bind(Object(d.a)(Object(d.a)(a))),a.menuSelection=a.menuSelection.bind(Object(d.a)(Object(d.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(e){var t=this;Object(f.a)("5eEncounters",1,{upgrade:k}).then(function(e){N=e}).then(function(e){console.log("App DataStore opened"),t.setState({databaseLoaded:!0})})}},{key:"menuSelection",value:function(e){var t=this;return function(a){t.setState({currentLocation:e})}}},{key:"getDisplayElement",value:function(){var e=this.state.currentLocation;return e?Ce[e]:o.a.createElement(b,{menuItems:Object.keys(Ce),onSelect:this.menuSelection})}},{key:"backToRootMenu",value:function(){this.setState({currentLocation:null})}},{key:"render",value:function(){var e=this.getDisplayElement(),t=this.state,a=t.currentLocation,n=t.databaseLoaded;return n?o.a.createElement("div",{className:"App"},null!=a&&o.a.createElement("button",{onClick:this.backToRootMenu},"Menu"),e):o.a.createElement("div",{className:"App"},o.a.createElement(p.a,{sizeUnit:"vmin",size:33,loading:!n}))}}]),t}(n.Component)),ke=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Oe(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(o.a.createElement(ye,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/5e-encounters",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/5e-encounters","/service-worker.js");ke?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Oe(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):Oe(t,e)})}}()},8:function(e,t,a){}},[[20,2,1]]]);
//# sourceMappingURL=main.7f649f1b.chunk.js.map