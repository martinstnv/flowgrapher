
const connector = (nodes) => {

    var vertices = [];
    var rest = JSON.parse(JSON.stringify(nodes));

    nodes.forEach(node => {

        var { index, level, token, src } = node;
        var iterLevel = level + 1;
        var stopper = false; // true to exit
        var connect = 0;

        rest.shift();
        rest.some(function(nextNode) {

            if(nextNode.level < iterLevel) { iterLevel = nextNode.level; }
            if(nextNode.token === 'if') { connect ++; }

           

            if( nextNode.level <= iterLevel ) {

                if(nextNode.token === 'end') {
                    vertices.push({from: index, to: nextNode.index}); 
                    stopper = true;
                }
                else if(nextNode.token === 'n/a') {
                    vertices.push({from: index, to: nextNode.index}); 
                    stopper = true;
                }
                else if(nextNode.token === 'if') {
                    vertices.push({from: index, to: nextNode.index}); 
                }
                else if(nextNode.token === 'elseif') {
                    if(connect > 0) {
                        if((token === 'if' || token === 'elseif') && level !== nextNode.level) {
                            vertices.push({from: index, to: nextNode.index}); 
                        }
                        else if(!(token === 'if' || token === 'elseif')) {
                            vertices.push({from: index, to: nextNode.index});
                        }
                    }
                }
                else if(nextNode.token === 'else') {
                    if(connect > 0) {
                        if((token === 'if' || token === 'elseif') && level == nextNode.level) {
                            vertices.push({from: index, to: nextNode.index});
                            stopper = true;
                        }
                        else if(!(token === 'if' || token === 'elseif')) {
                            vertices.push({from: index, to: nextNode.index});
                            stopper = true;
                        }
                    }
                }
            }

            return stopper;
        });
    });
    
    return vertices;
}

exports.connector = connector;