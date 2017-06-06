# studyEpam

<p align="center">Краткое описание проекта:</p>
<p align="center">
  <img width="600" height="352" src="./promo.jpg">
</p>

Запуск:

    npm i
    gulp
    
* Сборка - Gulp
* Статика - Pug
* Визуальная динмака - VanilaJS
* Контент-динмака - VanilaJS

## [#JS Core](./src/scripts/core)
### [#Async](./src/scripts/core/Async.js)
| Function        | Parameters           | Output  | Description  | 
| --------------- |:---------:| -------:| -------:|
| getJSON         | (string: URL, function: Callback) | Promise | Fetches JSON file from URL => callback(jsonResult)

### [#Classes](./src/scripts/core/classes.js)
| Function        | Parameters       | Output  | Description  | 
| --------------- |:---------:| -------:| -------:|
| add         | (Node: targetNode, string: classToAdd) |  | Adds classToAdd to the targetNode. If targetNode has classToAdd, then does nothing
| remove         | (Node: targetNode, string: classToRemove) |  | Removes classToRemove from the targetNode. If targetNode has no classToRemove, then does nothing
| toggle         | (Node: targetNode, string: classToToggle) |  | Toggles the classToToggle to the targetNode

### [#Selections](./src/scripts/core/Selections.js)
| Function        | Parameters       | Output  | Description  | 
| --------------- |:---------:| -------:| -------:|
| select         | (string: selector, Node: element=document) | \[instances of HTMLElements] | Syntactic sugar for (selector, element=document)=> element.querySelectorAll(selector);
| selectFirst         | (string: selector, Node: element=document) | instance of HTMLElement | Syntactic sugar for (selector, element=document)=> element.querySelector(selector)

### [#Strings](./src/scripts/core/Strings.js)
| Function        | Parameters       | Output  | Description  | 
| --------------- |:---------:| -------:| -------:|
| camalize         | (string: input) | string | Camalizes the input string
