const { filter } = require("../utils/filter.js");
const { parser } = require("../utils/parser.js");
const { connector } = require("../utils/connector.js");
const { uuidv4 } = require('../other/uuidv4.js');
const { bfs, getAdjacent, synthesize } = require('../utils/bfs.js');

const fs = require("fs");
const path = require("path");
const electron = require("electron");
const ipc = electron.ipcRenderer;

let sourceCode = null;
let paths = [];
let filePath = null;
let dirname = __dirname;

dirname =
  process.platform === "win32"
    ? dirname.replace("app\\view", "resources\\content")
    : dirname.replace("app/view", "resources/content");

filePath = path.join(dirname, "example.js");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (!err) {
    sourceCode = data;
    document.getElementById("start-btn").addEventListener("click", start);
  } else {
    console.log(err);
  }
});

function start() {

  var nodes = parser(filter(sourceCode));
  console.log(nodes);
  if(validate(nodes)){

    var edges = connector(nodes);
    console.log(edges)
    var vis_nodes = [];
    nodes.forEach(node => {
      const { index, token } = node;
      vis_nodes.push({ id: index, label: token });
    });
  
    var vis_nodes = new vis.DataSet(vis_nodes);
    var vis_edges = new vis.DataSet(edges);
  
    var container = document.getElementById("mynetwork");
  
    var data = {
      nodes: vis_nodes,
      edges: vis_edges
    };
  
    var options = {};
    var network = new vis.Network(container, data, options);
  
    const adjacent = getAdjacent(edges);
  
    var queue = [{ visited: { 0: true }, path: [0] }];
    var all_paths = bfs(adjacent, queue);
  
    for (const path of all_paths) {
      paths.push(synthesize(nodes, path));
    }
  
    document.getElementById("exp-paths").addEventListener("click", exp);
  }
  else {
    alert('ERROR, Forbiden operator "=" inside "if" statement\'s condition.')
  }
}

const exp = () => {
  const datetime = new Date().toISOString()
  fs.mkdir(`storage/${datetime}`, { recursive: true }, (err) => {
      if (err) throw err;
  });
  
  paths.forEach(path => {
      fs.appendFile(`storage/${datetime}/` + uuidv4(), path, function (err) {
          if (err) throw err;
      });
  })
}

function validate(nodes) {

  var isValid = true;
  nodes.forEach(node => {
    if(node.token === 'if') {
      var src = JSON.parse(JSON.stringify(node.src));

      if(src.split('===').join('').split('==').join('').includes('=')) {
        isValid = false;
      }
    }
  })

  return isValid;
}