const { Parser } = require('node-sql-parser');

const opt = {
  database: 'Postgresql' // MySQL is the default database
}
// import mysql parser only

const parser = new Parser()
// opt is optional
let sql1=` SELECT DISTINCT meeting_submit_emp_name
FROM meeting_detail
WHERE product_category_name = '唯择(Verzenios)'
LIMIT 10; `

let sql2 =`
SELECT meeting_name 
FROM "meeting_detail" 
WHERE (
  EXTRACT(MINUTE FROM (meeting_end_date - meeting_start_date)) < 60 AND actual_speaker_no > 5
) 
OR 
(
  EXTRACT(MINUTE FROM (meeting_end_date - meeting_start_date)) BETWEEN 60 
  AND 89 AND actual_speaker_no > 7
) 
OR
(
  EXTRACT(MINUTE FROM (meeting_end_date - meeting_start_date)) >= 90 AND (actual_speaker_no - 7) / 2 + 5 > actual_speaker_no
) 
AND meeting_leader_dept = 'Sales' 
AND meeting_leader_dept = 'Brand Team' 
AND meeting_leader_dept = 'Clinical'
LIMIT 10 `

const ast = parser.astify(sql2, opt);
// const sql = parser.sqlify(ast, opt);

// 获取 WHERE 子句
const whereClause = ast.where ?? ast[0].where

function convertToTable(conditions) {
  const table = [];

  function traverse(node) {
      if (node.type === "binary_expr") {
          // const row = {
          //     type: node.operator,
          //     left: node.left.type === "column_ref" ? node.left.column.expr.value : null,
          //     operator: node.operator,
          //     right: node.right.type === "column_ref" ? node.right.column.expr.value : (node.right.type === "number" ? node.right.value : node.right.value)
          // };
          table.push(node);
          if (node.left.type !== "column_ref") {
              traverse(node.left);
          }
          if (node.right.type !== "column_ref" && node.right.type !== "number" && node.right.type !== "single_quote_string") {
              traverse(node.right);
          }
      }
  }

  traverse(conditions);
  return table;
}

const tableFormat = convertToTable(whereClause);
console.table(tableFormat);