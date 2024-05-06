import markdownit from 'markdown-it'

import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';

// Then register the languages you need
hljs.registerLanguage('sql', sql);


function main() {
    let md = markdownit()
    let result = md.render('# markdown-it rulezz!');
    
    const answer = "```sql\nSELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';\n```"

    result = md.render(answer);

    let r = md.parse(answer)[0].content

    const highlightedCode = hljs.highlight(
        result,
        { language: 'sql' }
      ).value

    console.log('r: ', r);
    console.log('result: ', result,);
    console.log('highlightedCode: ', highlightedCode);
    

      
    const datas = [
      {
        meeting_id: "MID20240305467125",
        meeting_name: "第十Y届X子X腺癌学",
        total_attendees: null,
      },
      {
        meeting_id: "MID20240226487367",
        meeting_name: "海峡Y岸X一X银屑病",
        total_attendees: 5800,
      },
      {
        meeting_id: "MID20240321016083",
        meeting_name: "20Y4X第X期药师",
        total_attendees: 1067,
      },
    ]


    const text = arrayObjectToMarkdown(datas)
    

    console.log('text: ', text);



    /**
     * 
     * sql Text
     */
    r = md.render(`SELECT md.meeting_name
    FROM meeting_detail md
    JOIN speaker_meeting_detail smd ON md.meeting_code = smd.meeting_code
    WHERE smd.speaker_categories = '讨论嘉宾'
    GROUP BY md.meeting_name, md.meeting_start_date, md.meeting_end_date
    HAVING COUNT(*) > (
        5 + FLOOR((EXTRACT(EPOCH FROM (md.meeting_end_date - md.meeting_start_date)) / 60) / 30) * 2
    )
    LIMIT 10; 
    
    请注意，这个查询假设“讨论嘉宾”是指题目中的“角色嘉宾”，并且会议时长是按照分钟计算的。如果“讨论嘉宾”和“角色嘉宾”是不同的分类，或者需要考虑“大会主席”的数量，那么查询需要进行相应的调整。此外，这个查询没有考虑每60分钟增加1名大会主席的规则，因为题目中没有提供足够的信息来确定如何将这个规则转换为SQL逻辑。如果需要包含这个规则，需要进一步的信息和逻辑调整。`)
    

    console.log(r)
    

    
}


function arrayObjectToMarkdown(array: any[]) {
  let markdownText = '|';
  
  // 获取表头
  const headers = Object.keys(array[0]);
  markdownText += headers.join('|') + '|\n';
  
  // 添加表头分隔线
  markdownText += '|';
  for (let i = 0; i < headers.length; i++) {
    markdownText += ' :--- |';
  }
  markdownText += '\n';
  
  // 添加数据行
  array.forEach(item => {
    markdownText += '|';
    headers.forEach(header => {
      markdownText += item[header] + '|';
    });
    markdownText += '\n';
  });
  
  return markdownText;
}


main()