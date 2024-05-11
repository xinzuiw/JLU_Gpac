document.addEventListener('DOMContentLoaded', function () {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const popupTable = document.getElementById('popupTable');
    const resultContainer = document.getElementById('resultContainer');
    const compulsoryBtn = document.getElementById('compulsoryBtn');
    const electiveBtn = document.getElementById('electiveBtn');
    const limitedBtn = document.getElementById('limitedBtn');
    let checkboxes; // 声明变量，但不初始化
  
    sendMessageBtn.addEventListener('click', function () {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "executeFunction"}, function(response) {
          console.log('内容脚本返回的结果：', response);
          displayData(response); // 调用 displayData 函数
        });
      });
    });
  
    function displayData(data) {
      popupTable.innerHTML = ''; // 清空表格
  
      // 创建表头
      const headerRow = popupTable.insertRow();
      ['科目', '性质', '学分', '分数', '绩点', '选择'].forEach(function(item) {
        const th = document.createElement('th');
        th.textContent = item;
        headerRow.appendChild(th);
      });
  
      data.forEach(function(item) {
        const row = popupTable.insertRow();
        for (let i = 0; i < item.length; i++) {
          const cell = row.insertCell();
          cell.textContent = item[i];
        }
        const checkboxCell = row.insertCell(); // 插入选择框的单元格
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkboxCell.appendChild(checkbox); // 将选择框添加到单元格中
      });
  
      // 初始化复选框
      checkboxes = document.querySelectorAll('.checkbox');
    }
  
    // 点击计算按钮时的事件
    document.addEventListener('click', function(event) {
      if (event.target.matches('#calculateBtn')) {
        calculateGPA();
      }
    });
  
    // 点击必修按钮时的事件
    compulsoryBtn.addEventListener('click', function() {
      toggleRowsByProperty('必修');
    });
  
    // 点击选修按钮时的事件
    electiveBtn.addEventListener('click', function() {
      toggleRowsByProperty('选修');
    });
  
    // 点击限选按钮时的事件
    limitedBtn.addEventListener('click', function() {
      toggleRowsByProperty('限选');
    });
  
    function toggleRowsByProperty(property) {
      checkboxes.forEach(function(checkbox) {
        const row = checkbox.parentNode.parentNode;
        const propertyCell = row.cells[1];
        if (propertyCell.textContent === property) {
          checkbox.checked = !checkbox.checked; // 切换选择状态
        }
      });
    }
  
    function calculateGPA() {
        const checkedCheckboxes = document.querySelectorAll('.checkbox:checked'); // 获取已选择的复选框
        const selectedCoursesCount = checkedCheckboxes.length; // 获取选择的课程数量
        let totalCredits = 0;
        let totalGradePoints = 0;
      
        checkedCheckboxes.forEach(function(checkbox) {
          const row = checkbox.parentNode.parentNode;
          const credits = parseFloat(row.cells[2].textContent);
          const gradePoints = parseFloat(row.cells[4].textContent);
      
          totalCredits += credits;
          totalGradePoints += credits * gradePoints;
        });
      
        const averageGPA = totalGradePoints / totalCredits;
      
        resultContainer.innerHTML = `
          <p>选择了 ${selectedCoursesCount} 门课程</p>
          <p>总学分: ${totalCredits}</p>
          <p>总绩点: ${totalGradePoints}</p>
          <p>平均绩点: ${averageGPA.toFixed(2)}</p>
        `;
      }
      
  });
  