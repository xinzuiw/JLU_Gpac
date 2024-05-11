function cau(){
// console.log("注入完成")
b = document.getElementById('pinnedtableqb-index-table').rows
var ans = []; // 初始化二维数组

// 遍历每个 <tr> 元素
for (var i = 0; i < b.length; i++) {
    var tr = b[i]; // 获取当前的 <tr> 元素

    var row = []; // 初始化当前行数组

    // 获取当前 <tr> 元素中的所有 <td> 元素
    var tdElements = tr.getElementsByTagName("td");

    // 遍历每个 <td> 元素并获取内容
    for (var j = 0; j < tdElements.length; j++) {
        var td = tdElements[j];
        var tdContent = getTDContent(td);
        
        // 将当前单元格的内容添加到当前行数组中
        row.push(tdContent);
    }

    // 将当前行数组添加到二维数组中
    ans.push(row);
}
var result =[];
// 打印二维数组中的内容
for (var i = 0; i < ans.length; i++) {
    let tem =[];
    tem[0] = ans[i][3];
    tem[1] = ans[i][7];
    tem[2] = ans[i][8]
    tem[3] = ans[i][1];
    tem[4] = ans[i][13];
    result[i] = tem;
    // 数据转存到tem
}



// 递归函数用于获取 <td> 元素的内容
function getTDContent(td) {
    var content = ""; // 初始化内容字符串

    // 遍历 <td> 元素的子节点
    for (var k = 0; k < td.childNodes.length; k++) {
        var node = td.childNodes[k]; // 获取当前子节点

        // 检查当前子节点的类型
        if (node.nodeType === Node.TEXT_NODE) {
            // 如果是文本节点，直接获取文本内容并添加到内容字符串中
            content += node.textContent.trim();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // 如果是元素节点，继续递归地获取其内容
            content += getTDContent(node);
        }
    }

    // 返回处理后的内容字符串
    return content;
}


return  result;

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "executeFunction") {
      const result = cau(); // 替换成你想要执行的函数
      console.log(result);
      sendResponse(result);
    }
  });
  

  