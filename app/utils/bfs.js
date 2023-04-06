
const getAdjacent = (edges) => {

    var adjacent = [[]];
    var currentEdge = 0;

    edges.forEach(edge => {

        if (edge.from !== currentEdge) {
            currentEdge = edge.from;
            adjacent.push([edge.to]);
        }
        else if (edge.from === currentEdge) {
            adjacent[adjacent.length - 1] = adjacent[adjacent.length - 1].concat([edge.to]);
        }
    });

    return adjacent;
}

const bfs = (rightAdjacent, queue) => {
    var paths = [];
    while (queue.length) {
        var obj = queue.pop();
        var node = obj.path[obj.path.length - 1];
        var visited = obj.visited
        if (node >= rightAdjacent.length || rightAdjacent[node].length == 0) {
            paths.push(obj.path);
        } else {
            for (var i = 0; i < rightAdjacent[node].length; i++) {
                if (!visited[rightAdjacent[node][i]]) {
                    visited[rightAdjacent[node][i]] = true
                    var arr = obj.path.slice(0);
                    arr.push(rightAdjacent[node][i]); queue.push({ visited: JSON.parse(JSON.stringify(visited)), path: arr })
                }
            }
        }
    }
    return paths;
}

const synthesize = (nodes, path) => {
    var synthesized = '';
    path.forEach(p => {
        var { token, src } = nodes[p];
        synthesized += token + src + '\n';
    });

    return synthesized;
}

exports.bfs = bfs;
exports.synthesize = synthesize;
exports.getAdjacent = getAdjacent;