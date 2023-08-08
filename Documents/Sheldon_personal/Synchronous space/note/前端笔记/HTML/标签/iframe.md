# \<iframe\>
#前端 #HTML

**HTML内联框架元素 (`<iframe>`)** 表示嵌套的[browsing context](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context)。它能够将另一个HTML页面嵌入到当前页面中。

每个嵌入的浏览上下文（embedded browsing context）都有自己的[会话历史记录(session history)](https://developer.mozilla.org/zh-CN/docs/Web/API/History)和[DOM树](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)。包含嵌入内容的浏览上下文称为_父级浏览上下文_。顶级浏览上下文（没有父级）通常是由 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象表示的浏览器窗口。