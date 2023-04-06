
const { TOKENS } = require("../other/tokens.js");

const parser = (input) => {
    
    if(typeof input !== 'object' ) {
        return;
    }

    var vertices = [];
    var vertice = {};
    var index = 0;
    var level = 0;

    vertices.push({index: index++, level: level++, token: 'main', src: ''});

    input.forEach((element,iterator) => {

        if(TOKENS.includes(element)) {

            // Add n/a
            if(vertice.token && vertice.src.length > 0) {
                vertice.index = index++;
                vertice.level = level; 
                vertices.push(vertice); 
            }

            // Add operator
            vertices.push({index: index ++, level: level, token: element, src: ''});
 
            vertice = {};
            vertice.index = 0;
            vertice.level = 0;
            vertice.token = '';
            vertice.src = '';
 
        }
        else if(element === '{') {
            // Add n/a
            if(vertice.token !== '' && vertice.src !== '') {
                vertice.index = index++;
                vertice.level = level; 
                vertices.push(vertice); 
            }

            level++; 

            // New n/a
            vertices[vertices.length - 1].src = vertice.src;
            vertice = {};
            vertice.index = 0;
            vertice.level = 0;
            vertice.token = 'n/a'; //here
            vertice.src = '';
        }
        else if(element === '}') { 
            // Add n/a
            if(vertice.token !== '' && vertice.src !== '') {
                vertice.index = index++;
                vertice.level = level; 
                vertices.push(vertice);  //here
            }

            level--; 

            // New n/a
            vertice = {};
            vertice.index = 0;
            vertice.level = 0;
            vertice.token = 'n/a';
            vertice.src = '';
        }
        else {
            vertice.src += element;
        }

        // Add last
        if(iterator === input.length -1) {
            if(vertice.token){
                vertice.index = index++;
                vertices.push(vertice);
            }
        }
    });

    vertices.push({index: index, level: level, token: 'end', src: ''});

    return vertices;
}

exports.parser = parser;