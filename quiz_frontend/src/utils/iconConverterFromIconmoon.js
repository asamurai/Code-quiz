const fs = require('fs');
//Move icons pack to the directory utils
//Delete iconset.json after converting
const icons = require('./iconset.json');

const iconsArr = icons.icons
    .map(icon => {
        return {path: icon.paths[0], name: icon.tags[0]};
    })
    .reduce((prev, next)=>{
        const obj = {};
        obj[next.name] = next.path;

        return { ...prev, ...obj };
    },{});

fs
    .writeFile('icons.json', JSON.stringify(iconsArr), (err) => {
        if (err) throw err;

        console.log("The icon file was succesfully saved!");
    }); 
