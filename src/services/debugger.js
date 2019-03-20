function cl(o) {
  if (typeof o === "string") {
    console.log("String : " + o + "\n");
  // } else if (Array.isArray(o)) {
  //   for (e in o) {
  //     console.log(`Array element of ${e}`);
  //     cl(o[e])
  //   }
  } else {
    console.log("Object : " + JSON.stringify(o, null, 2));
  }
}

function parseQuestionIndex(content) {
  const ast = md.parse(mdcontent);
  cl(ast)
  for (i = 0; i < ast.length; i++) {
    if (ast[i]["markup"] === "##") {
      return i + 1;
    }
  }
  return -1;
}

module.exports = cl;
