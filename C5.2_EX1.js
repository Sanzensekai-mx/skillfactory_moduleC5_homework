const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlParser = new DOMParser()

const xmlDOM = xmlParser.parseFromString(xmlString, 'text/xml')
const listNode = xmlDOM.querySelector('list')
console.log(Array.from(listNode.children))

const result = {
    list: []
}

const listAccess = Array.from(listNode.children)

for (let student in listAccess) {
    let first = listAccess[student].querySelector('name').querySelector('first').textContent 
    let second = listAccess[student].querySelector('name').querySelector('second').textContent
    result.list.push({
        name: first + ' ' + second,
        age: listAccess[student].querySelector('age').textContent,
        prof: listAccess[student].querySelector('prof').textContent,
        lang: listAccess[student].querySelector('name').getAttribute('lang'),
    })
}




console.log(result)