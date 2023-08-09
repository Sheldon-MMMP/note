\<script\>主要的几个属性，一共有8个属性:

“**async**：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其 他脚本加载。只对外部脚本文件有效。” ([Frisbie, 2020, p. 11](zotero://select/library/items/7IJ4AZCV)) ([pdf](zotero://open-pdf/library/items/ANGIKB3K?page=36&annotation=4BMXDNVX))

“**defer**：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。” ([Frisbie, 2020, p. 11](zotero://select/library/items/7IJ4AZCV)) ([pdf](zotero://open-pdf/library/items/ANGIKB3K?page=36&annotation=V2XHTE7C))

“**src**：可选。表示包含要执行的代码的外部文件。” ([Frisbie, 2020, p. 11](zotero://select/library/items/7IJ4AZCV)) ([pdf](zotero://open-pdf/library/items/ANGIKB3K?page=36&annotation=ZNPVAAQF))

“**type**：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯 例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript" 都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有 "application/javascript"和"application/ecmascript"。如果这个值是 module，则 代 码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。” ([Frisbie, 2020, p. 12](zotero://select/library/items/7IJ4AZCV)) ([pdf](zotero://open-pdf/library/items/ANGIKB3K?page=37&annotation=FMWHAFTN))